import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import { executeAiTask } from "@/lib/ai/engine";

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();

    const result = await executeAiTask({
      task: "test_connection",
    });

    if (!result.success) {
      return NextResponse.json(
        {
          provider: result.provider || "gemini",
          model: result.model || "gemini-2.0-flash",
          status: "failed",
          error: result.error || "Connection test failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      provider: result.provider,
      model: result.model,
      status: result.status || "success",
    });
  } catch (error) {
    console.error("[GET /api/admin/ai] Diagnostic Error:", error);
    return NextResponse.json(
      {
        provider: "unknown",
        model: "unknown",
        status: "error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload. Expected JSON object." },
        { status: 400 }
      );
    }

    const { task, input = {}, options = {} } = body;

    if (!task || typeof task !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing 'task' property in AI request." },
        { status: 400 }
      );
    }

    const adminContext = {
      adminId: auth._id?.toString() || auth.id || "admin",
      adminName: auth.name || "Admin",
    };

    const result = await executeAiTask({
      task,
      input,
      options,
      adminContext,
    });

    if (task === "test_connection") {
      if (!result.success) {
        return NextResponse.json(
          {
            provider: result.provider || "gemini",
            model: result.model || "gemini-2.0-flash",
            status: "failed",
          },
          { status: 500 }
        );
      }
      return NextResponse.json({
        provider: result.provider,
        model: result.model,
        status: result.status || "success",
      });
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "AI generation failed." },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[POST /api/admin/ai] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
