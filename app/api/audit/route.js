import { NextResponse } from "next/server";
import { auditWebsite } from "@/lib/websiteAudit";

// Rate limiter: 10 audits per IP per hour
const ipMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxReqs = 10;

  if (ipMap.size > 2000) {
    for (const [key, val] of ipMap.entries()) {
      if (now - val.start > windowMs) ipMap.delete(key);
    }
  }

  const record = ipMap.get(ip);
  if (!record || now - record.start > windowMs) {
    ipMap.set(ip, { count: 1, start: now });
    return false;
  }

  if (record.count >= maxReqs) return true;
  record.count++;
  return false;
}

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Audit limit reached. Please try again in 1 hour." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { url, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ success: false, error: "Spam detected." }, { status: 400 });
    }

    if (!url || typeof url !== "string") {
      return NextResponse.json({ success: false, error: "Please provide a valid website URL." }, { status: 400 });
    }

    const report = await auditWebsite(url);
    if (!report.success) {
      return NextResponse.json({ success: false, error: report.error }, { status: 400 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("[Public Audit API] Error:", error);
    return NextResponse.json({ success: false, error: "Website analysis failed. Please try again." }, { status: 500 });
  }
}
