import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import { executeAiTask } from "@/lib/ai/engine";

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();

    const body = await req.json().catch(() => null);
    const { prompt, type } = body || {};

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid topic or title (at least 3 characters)." },
        { status: 400 }
      );
    }

    // Auto-detect type if not explicitly provided or if prompt explicitly requests a service
    let resolvedType = type;
    if (!resolvedType || resolvedType === "blog") {
      if (/\b(?:service|services|service\s+page|seo services|local seo|google ads|web development)\b/i.test(prompt)) {
        resolvedType = "service";
      } else if (/\b(?:case study|project|portfolio)\b/i.test(prompt)) {
        resolvedType = "project";
      } else {
        resolvedType = "blog";
      }
    }

    const task =
      resolvedType === "service"
        ? "generate_service"
        : resolvedType === "project"
        ? "generate_project"
        : "generate_blog";

    const adminContext = {
      adminId: auth._id?.toString() || auth.id || "admin",
      adminName: auth.name || "Admin",
    };

    const result = await executeAiTask({
      task,
      input: {
        serviceName: prompt.trim(),
        topic: prompt.trim(),
        projectName: prompt.trim(),
        prompt: prompt.trim(),
      },
      adminContext,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to generate content." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      content: result.content,
      provider: result.provider,
      model: result.model,
    });
  } catch (error) {
    console.error("[POST /api/admin/ai-generate] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate content." },
      { status: 500 }
    );
  }
}
