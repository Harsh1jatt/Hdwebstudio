import connectDB from "./db";
import Service from "../models/Service";
import {
  serviceList as staticServiceList,
  services as staticServicesMap,
  getService as getStaticService,
  getAllServiceSlugs as getStaticServiceSlugs,
  serviceAccentBySlug,
} from "./services-data";

function withAccent(service) {
  if (!service) return null;
  return {
    ...service,
    accent: service.accent || serviceAccentBySlug[service.slug] || "blue",
  };
}

function normalizeDbService(doc) {
  if (!doc) return null;

  return withAccent({
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
  });
}

function getStaticPublishedServices() {
  return staticServiceList.map((service) => withAccent(service));
}

async function getDbServiceCount() {
  await connectDB();
  return Service.countDocuments();
}

export async function getPublishedServices() {
  try {
    const totalCount = await getDbServiceCount();
    if (totalCount > 0) {
      const docs = await Service.find({ published: true })
        .sort({ order: 1, createdAt: 1 })
        .lean();

      return docs.map(normalizeDbService);
    }
  } catch (error) {
    console.error("[services] Failed to load published services from DB:", error);
  }

  return getStaticPublishedServices();
}

export async function getPublishedServiceBySlug(slug) {
  try {
    const totalCount = await getDbServiceCount();

    if (totalCount > 0) {
      const doc = await Service.findOne({ slug, published: true }).lean();
      return doc ? normalizeDbService(doc) : null;
    }
  } catch (error) {
    console.error(
      `[services] Failed to load service "${slug}" from DB:`,
      error
    );
    return withAccent(getStaticService(slug));
  }

  return withAccent(getStaticService(slug));
}

export async function getAllPublishedServiceSlugs() {
  try {
    const totalCount = await getDbServiceCount();

    if (totalCount > 0) {
      const docs = await Service.find({ published: true })
        .sort({ order: 1, createdAt: 1 })
        .select("slug")
        .lean();

      return docs.map((doc) => doc.slug);
    }
  } catch (error) {
    console.error("[services] Failed to load service slugs from DB:", error);
  }

  return getStaticServiceSlugs();
}

export function getStaticServiceMap() {
  return staticServicesMap;
}
