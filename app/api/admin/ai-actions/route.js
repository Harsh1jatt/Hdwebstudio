import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import AiActionLog from "@/models/AiActionLog";

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();
    const url = new URL(req.url);
    const limit = Math.min(100, parseInt(url.searchParams.get("limit") || "30", 10));
    const entityType = url.searchParams.get("entityType");

    const filter = {};
    if (entityType) filter.entityType = entityType;

    const logs = await AiActionLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      count: logs.length,
      logs: logs.map((l) => ({
        id: l._id.toString(),
        adminName: l.adminName,
        prompt: l.prompt,
        action: l.action,
        tool: l.tool,
        entityType: l.entityType,
        entitySlug: l.entitySlug,
        status: l.status,
        summary: l.summary,
        details: l.details,
        createdAt: l.createdAt,
      })),
    });
  } catch (error) {
    console.error("[AI Actions API] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to load audit history" }, { status: 500 });
  }
}
