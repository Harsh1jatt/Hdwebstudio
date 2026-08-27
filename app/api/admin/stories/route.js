import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import connectDB from "@/lib/db";
import Story from "@/models/Story";
import { slugify } from "@/lib/slugify";

export async function GET(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get("perPage") || "20", 10)));
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "all";
    const sort = searchParams.get("sort") || "newest";

    const filter = {};
    if (q) {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { title: { $regex: escaped, $options: "i" } },
        { slug: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
      ];
    }
    if (status !== "all") filter.status = status;

    let sortObj = { createdAt: -1 };
    if (sort === "newest") sortObj = { publishedAt: -1 };
    if (sort === "oldest") sortObj = { publishedAt: 1 };
    if (sort === "updated") sortObj = { updatedAt: -1 };

    const total = await Story.countDocuments(filter);
    const skip = (page - 1) * perPage;
    const docs = await Story.find(filter).sort(sortObj).skip(skip).limit(perPage).lean();

    const stories = docs.map((d) => ({
      id: d._id.toString(),
      title: d.title,
      slug: d.slug,
      description: d.description || "",
      category: d.category || "",
      status: d.status,
      slideCount: (d.slides || []).length,
      publishedAt: d.publishedAt || null,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));

    return NextResponse.json({ success: true, stories, total, page, perPage });
  } catch (error) {
    console.error("stories GET error", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const admin = await requireAdminApi(req);
    if (admin instanceof Response) return admin;

    const body = await req.json();
    const { title, slug: rawSlug, description, publisher, publisherLogo, posterImage, posterImageAlt, category, tags, status, slides, seoTitle, seoDescription, ogImage, canonicalUrl, noindex } = body;

    if (!title?.trim()) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }

    await connectDB();

    const finalSlug = slugify(rawSlug || title);

    // Check slug uniqueness
    const existing = await Story.findOne({ slug: finalSlug });
    if (existing) {
      return NextResponse.json({ success: false, error: "A story with this slug already exists" }, { status: 409 });
    }

    const story = await Story.create({
      title: title.trim(),
      slug: finalSlug,
      description: description || "",
      publisher: publisher || "HD Web Studios",
      publisherLogo: publisherLogo || "",
      posterImage: posterImage || "",
      posterImageAlt: posterImageAlt || "",
      category: category || "",
      tags: Array.isArray(tags) ? tags : [],
      status: status || "draft",
      slides: Array.isArray(slides) ? slides : [],
      publishedAt: status === "published" ? new Date() : null,
      seoTitle: seoTitle || "",
      seoDescription: seoDescription || "",
      ogImage: ogImage || "",
      canonicalUrl: canonicalUrl || "",
      noindex: noindex || false,
    });

    return NextResponse.json({ success: true, story: { id: story._id.toString(), slug: story.slug } }, { status: 201 });
  } catch (error) {
    console.error("stories POST error", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
