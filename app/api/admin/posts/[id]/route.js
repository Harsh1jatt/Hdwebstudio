import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import { requireAdminApi } from "@/lib/auth";
import { parsePostPayload, parsePostPatchPayload } from "@/utils/postValidation";
import { serializePost, derivePostMetrics } from "@/lib/admin/serializePost";

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid post id" }, { status: 400 });
    }

    await connectDB();
    const post = await Post.findById(id).lean();
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post: serializePost(post, { includeContent: true }),
    });
  } catch (error) {
    console.error("admin post detail error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid post id" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = parsePostPayload(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    await connectDB();

    const duplicate = await Post.findOne({
      slug: parsed.data.slug,
      _id: { $ne: id },
    }).lean();

    if (duplicate) {
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
      parsed.data.status === "published" ? parsed.data.publishedAt || new Date() : null;

    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...parsed.data,
        excerpt,
        readingTime,
        publishedAt,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post: serializePost(post, { includeContent: true }),
    });
  } catch (error) {
    console.error("admin post update error:", error);
    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A post with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid post id" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = parsePostPatchPayload(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    await connectDB();
    const existing = await Post.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      const duplicate = await Post.findOne({
        slug: parsed.data.slug,
        _id: { $ne: id },
      }).lean();
      if (duplicate) {
        return NextResponse.json(
          { success: false, error: "A post with this slug already exists." },
          { status: 409 }
        );
      }
    }

    const updates = { ...parsed.data };
    if (updates.status) {
      updates.publishedAt =
        updates.status === "published" ? updates.publishedAt || new Date() : null;
    }

    if (updates.content !== undefined) {
      const format = updates.contentFormat || existing.contentFormat || "markdown";
      const metrics = derivePostMetrics(
        updates.content,
        format,
        updates.excerpt || existing.excerpt
      );
      updates.readingTime = metrics.readingTime;
      if (!updates.excerpt?.trim()) updates.excerpt = metrics.excerpt;
    }

    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post: serializePost(post, { includeContent: true }),
    });
  } catch (error) {
    console.error("admin post patch error:", error);
    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A post with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: "Invalid post id" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Post.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("admin post delete error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
