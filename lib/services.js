import connectDB from "./db";
import Service from "../models/Service";

const accentMap = {
  blue: "blue",
  emerald: "emerald",
  purple: "purple",
  orange: "orange",
};

function normalizeDbService(doc) {
  if (!doc) return null;
  return {
    slug: doc.slug,
    icon: doc.icon || "Globe",
    eyebrow: doc.eyebrow,
    title: doc.title,
    tagline: doc.tagline || "",
    shortDescription: doc.shortDescription || "",
    description: doc.description || "",
    category: doc.category || "",
    accent: doc.accent || accentMap[doc.accent] || "blue",
    order: doc.order ?? 0,
    published: doc.published,
    heroStats: doc.heroStats || [],
    overview: doc.overview || { heading: "", paragraphs: [], highlights: [] },
    whatYouGet: doc.whatYouGet || [],
    faq: doc.faq || [],
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function getPublishedServices() {
  try {
    await connectDB();
    const docs = await Service.find({ published: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return docs.map(normalizeDbService);
  } catch (error) {
    console.error("[services] Failed to load from DB:", error);
    return [];
  }
}

export async function getPublishedServiceBySlug(slug) {
  try {
    await connectDB();
    const doc = await Service.findOne({ slug, published: true }).lean();
    return normalizeDbService(doc);
  } catch (error) {
    console.error(`[services] Failed to load "${slug}":`, error);
    return null;
  }
}

export async function getAllPublishedServiceSlugs() {
  try {
    await connectDB();
    const docs = await Service.find({ published: true })
      .sort({ order: 1 })
      .select("slug")
      .lean();
    return docs.map((d) => d.slug);
  } catch (error) {
    console.error("[services] Failed to load slugs:", error);
    return [];
  }
}
