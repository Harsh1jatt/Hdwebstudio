import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Story from "@/models/Story";
import { slugify } from "@/lib/slugify";

export async function GET(req, { params }) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    const { id } = await params;
    await connectDB();
    const story = await Story.findById(id).lean();
    if (!story) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      story: {
        ...story,
        _id: story._id.toString(),
        slides: (story.slides || []).map((s) => ({
          ...s,
          _id: s._id?.toString?.() || "",
        })),
      },
    });
  } catch (error) {
    console.error("story GET error", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    const { id } = await params;
    const body = await req.json();

    await connectDB();
    const story = await Story.findById(id);
    if (!story) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
    }

    // Update fields
    const allowedFields = [
      "title", "slug", "description", "publisher", "publisherLogo",
      "posterImage", "posterImageAlt", "category", "tags", "status",
      "slides", "seoTitle", "seoDescription", "ogImage", "canonicalUrl", "noindex",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === "slug") {
          story[field] = slugify(body[field] || story.title);
        } else if (field === "tags" && Array.isArray(body[field])) {
          story[field] = body[field];
        } else if (field === "slides" && Array.isArray(body[field])) {
          story[field] = body[field];
        } else {
          story[field] = body[field];
        }
      }
    }

    // Handle publish/unpublish
    if (body.status === "published" && !story.publishedAt) {
      story.publishedAt = new Date();
    }
    if (body.status === "draft") {
      story.publishedAt = null;
    }

    // Check slug uniqueness if changed
    if (body.slug) {
      const existing = await Story.findOne({ slug: story.slug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json({ success: false, error: "Slug already in use" }, { status: 409 });
      }
    }

    await story.save();
    return NextResponse.json({ success: true, story: { id: story._id.toString(), slug: story.slug } });
  } catch (error) {
    console.error("story PATCH error", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    const { id } = await params;
    await connectDB();
    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Story deleted" });
  } catch (error) {
    console.error("story DELETE error", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
