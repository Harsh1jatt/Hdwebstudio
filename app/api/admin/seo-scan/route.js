import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import { runFullSiteSeoAudit } from "@/lib/seo/siteAuditEngine";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();

    const auditResult = await runFullSiteSeoAudit();

    return NextResponse.json({
      success: true,
      overall: auditResult.overall,
      content: auditResult.items,
      orphanPages: auditResult.orphanPages,
    });
  } catch (error) {
    console.error("[SEO Scan API] Error:", error);
    return NextResponse.json({ success: false, error: "SEO audit scan failed: " + error.message }, { status: 500 });
  }
}

