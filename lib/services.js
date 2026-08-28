import connectDB from "./db";
import Service from "../models/Service";
import { services as staticServices, getService as getStaticService, getAllServiceSlugs as getStaticServiceSlugs } from "./services-data";

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
    h1Heading: doc.h1Heading || "",
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
    if (docs && docs.length > 0) {
      return docs.map(normalizeDbService);
    }
    return Object.values(staticServices);
  } catch (error) {
    console.error("[services] Failed to load from DB, using fallback:", error);
    return Object.values(staticServices);
  }
}

export async function getPublishedServiceBySlug(slug) {
  try {
    await connectDB();
    const doc = await Service.findOne({ slug, published: true }).lean();
    if (doc) return normalizeDbService(doc);
    return getStaticService(slug);
  } catch (error) {
    console.error(`[services] Failed to load "${slug}" from DB, using fallback:`, error);
    return getStaticService(slug);
  }
}

export async function getAllPublishedServiceSlugs() {
  try {
    await connectDB();
    const docs = await Service.find({ published: true })
      .sort({ order: 1 })
      .select("slug")
      .lean();
    if (docs && docs.length > 0) {
      return docs.map((d) => d.slug);
    }
    return getStaticServiceSlugs();
  } catch (error) {
    console.error("[services] Failed to load slugs, using fallback:", error);
    return getStaticServiceSlugs();
  }
}

export async function getPublishedServicesCount() {
  try {
    await connectDB();
    const count = await Service.countDocuments({ published: true });
    return count > 0 ? count : Object.keys(staticServices).length;
  } catch {
    return Object.keys(staticServices).length;
  }
}
