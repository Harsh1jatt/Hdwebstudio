import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { requireAdminApi } from "@/lib/auth";
import { parseProjectPayload } from "@/utils/projectValidation";

function serializeProject(doc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    shortDescription: doc.shortDescription || "",
    description: doc.description || "",
    client: doc.client || "",
    category: doc.category || "",
    industry: doc.industry || "",
    location: doc.location || "",
    projectType: doc.projectType || "client",
    year: doc.year || "",
    challenge: doc.challenge || "",
    solution: doc.solution || "",
    results: doc.results || [],
    features: doc.features || [],
    technologies: doc.technologies || [],
    services: doc.services || [],
    featuredImage: doc.featuredImage || "",
    thumbnail: doc.thumbnail || "",
    gallery: doc.gallery || [],
    demoUrl: doc.demoUrl || "",
    liveUrl: doc.liveUrl || "",
    githubUrl: doc.githubUrl || "",
    caseStudyUrl: doc.caseStudyUrl || "",
    testimonial: doc.testimonial || { quote: "", author: "", role: "" },
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
    published: doc.published,
    order: doc.order ?? 0,
    featured: Boolean(doc.featured),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();

    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim();
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10) || 1);
    const perPage = Math.min(100, parseInt(url.searchParams.get("perPage") || "20", 10) || 20);
    const publishedParam = url.searchParams.get("published");
    const sort = url.searchParams.get("sort") || "order";

    const filter = {};
    if (publishedParam === "true") filter.published = true;
    if (publishedParam === "false") filter.published = false;

    if (q) {
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ title: regex }, { slug: regex }, { client: regex }, { category: regex }];
    }

    const sortMap = {
      order: { order: 1, createdAt: 1 },
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      title: { title: 1 },
    };
    const sortOption = sortMap[sort] || sortMap.order;

    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();

    return NextResponse.json({
      success: true,
      projects: projects.map(serializeProject),
      total,
      page,
      perPage,
    });
  } catch (error) {
    console.error("admin projects list error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    const parsed = parseProjectPayload(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    await connectDB();
    const existing = await Project.findOne({ slug: parsed.data.slug }).lean();
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    const project = await Project.create(parsed.data);
    return NextResponse.json({ success: true, project: serializeProject(project) }, { status: 201 });
  } catch (error) {
    console.error("admin projects create error:", error);
    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
