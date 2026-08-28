import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { generateAI } from "@/lib/ai/provider";

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    const { prompt, type = "blog" } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid topic or title (at least 3 characters)." },
        { status: 400 }
      );
    }

    // Generate structured content using provider abstraction
    const genResult = await generateAI(prompt.trim(), { contentType: type });

    let parsedContent;
    try {
      parsedContent = typeof genResult.text === "string" ? JSON.parse(genResult.text) : genResult.text;
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to parse generated AI structure." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      content: parsedContent,
    });
  } catch (error) {
    console.error("AI generate error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate content." },
      { status: 500 }
    );
  }
}
