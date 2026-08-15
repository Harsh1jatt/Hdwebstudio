import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { requireAdminApi } from "@/lib/auth";
import { parseServicePayload } from "@/utils/serviceValidation";

function serializeService(doc) {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    icon: doc.icon,
    eyebrow: doc.eyebrow,
    title: doc.title,
    tagline: doc.tagline,
    shortDescription: doc.shortDescription || "",
    description: doc.description,
    category: doc.category || "",
    accent: doc.accent,
    order: doc.order ?? 0,
    published: doc.published,
    heroStats: doc.heroStats || [],
    overview: doc.overview,
    whatYouGet: doc.whatYouGet || [],
    faq: doc.faq || [],
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
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
    const perPage = Math.min(
      100,
      parseInt(url.searchParams.get("perPage") || "20", 10) || 20
    );
    const publishedParam = url.searchParams.get("published");
    const sort = url.searchParams.get("sort") || "order";

    const filter = {};

    if (publishedParam === "true") filter.published = true;
    if (publishedParam === "false") filter.published = false;

    if (q) {
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { eyebrow: regex },
        { title: regex },
        { slug: regex },
        { category: regex },
      ];
    }

    const sortMap = {
      order: { order: 1, createdAt: 1 },
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      title: { eyebrow: 1 },
    };

    const sortOption = sortMap[sort] || sortMap.order;

    const total = await Service.countDocuments(filter);
    const services = await Service.find(filter)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();

    return NextResponse.json({
      success: true,
      services: services.map(serializeService),
      total,
      page,
      perPage,
    });
  } catch (error) {
    console.error("admin services list error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const body = await req.json();
    const parsed = parseServicePayload(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors.map((e) => e.message).join(", "),
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Service.findOne({ slug: parsed.data.slug }).lean();
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    const service = await Service.create(parsed.data);

    return NextResponse.json(
      { success: true, service: serializeService(service) },
      { status: 201 }
    );
  } catch (error) {
    console.error("admin services create error:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
