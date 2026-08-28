import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { auditWebsite } from "@/lib/ai/websiteAudit";

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ success: false, error: "Please provide a website URL to audit." }, { status: 400 });
    }

    const report = await auditWebsite(url);
    if (!report.success) {
      return NextResponse.json({ success: false, error: report.error }, { status: 400 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("[Website Audit API] Error:", error);
    return NextResponse.json({ success: false, error: "Website audit failed." }, { status: 500 });
  }
}
