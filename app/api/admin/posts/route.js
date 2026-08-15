import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import { requireAdminApi } from "@/lib/auth";
import { parsePostPayload } from "@/utils/postValidation";
import { serializePost, derivePostMetrics } from "@/lib/admin/serializePost";

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();

    const url = new URL(req.url);
    const checkSlug = (url.searchParams.get("checkSlug") || "").trim();
    const excludeId = url.searchParams.get("excludeId") || "";

    if (checkSlug) {
      const filter = { slug: checkSlug };
      if (excludeId && mongoose.Types.ObjectId.isValid(excludeId)) {
        filter._id = { $ne: excludeId };
      }
      const existing = await Post.findOne(filter).lean();
      return NextResponse.json({ success: true, available: !existing });
    }

    const q = (url.searchParams.get("q") || "").trim();
    const category = (url.searchParams.get("category") || "").trim();
    const status = (url.searchParams.get("status") || "").trim();
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10) || 1);
    const perPage = Math.min(100, parseInt(url.searchParams.get("perPage") || "20", 10) || 20);
    const sort = url.searchParams.get("sort") || "order";

    const filter = {};
    if (category) filter.category = category;
    if (status === "draft" || status === "published") filter.status = status;

    if (q) {
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { title: regex },
        { slug: regex },
        { author: regex },
        { category: regex },
      ];
    }

    const sortMap = {
      order: { updatedAt: -1 },
      newest: { publishedAt: -1, createdAt: -1 },
      updated: { updatedAt: -1 },
      oldest: { createdAt: 1 },
    };
    const sortOption = sortMap[sort] || sortMap.order;

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();

    return NextResponse.json({
      success: true,
      posts: posts.map((p) => serializePost(p)),
      total,
      page,
      perPage,
    });
  } catch (error) {
    console.error("admin posts list error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    const parsed = parsePostPayload(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    await connectDB();

    const { slug, status } = parsed.data;

    const existing = await Post.findOne({ slug }).lean();
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A post with this slug already exists." },
        { status: 409 }
      );
    }

    const format = parsed.data.contentFormat || "html";
    const { readingTime, excerpt } = derivePostMetrics(
      parsed.data.content,
      format,
      parsed.data.excerpt
    );

    const publishedAt =
      status === "published" ? parsed.data.publishedAt || new Date() : null;

    const post = await Post.create({
      ...parsed.data,
      excerpt,
      readingTime,
      publishedAt,
    });

    return NextResponse.json(
      { success: true, post: serializePost(post, { includeContent: true }) },
      { status: 201 }
    );
  } catch (error) {
    console.error("admin posts create error:", error);
    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A post with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
