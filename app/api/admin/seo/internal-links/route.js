import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import Post from "@/models/Post";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();

    const [services, posts, projects] = await Promise.all([
      Service.find({ published: true }).select("title slug category eyebrow").lean(),
      Post.find({ status: "published" }).select("title slug category focusKeyword").lean(),
      Project.find({ published: true }).select("title slug category client").lean(),
    ]);

    return NextResponse.json({
      success: true,
      services,
      posts,
      projects,
    });
  } catch (err) {
    console.error("[Internal Links Candidate API] Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
