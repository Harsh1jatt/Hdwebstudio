import connectDB from "./db";
import Story from "@/models/Story";

function normalizeDbStory(doc) {
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    description: doc.description || "",
    publisher: doc.publisher || "HD Web Studios",
    publisherLogo: doc.publisherLogo || "",
    posterImage: doc.posterImage || "",
    posterImageAlt: doc.posterImageAlt || "",
    category: doc.category || "",
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    status: doc.status,
    slides: (doc.slides || []).map((s) => ({
      _id: s._id?.toString?.() || "",
      heading: s.heading || "",
      body: s.body || "",
      image: s.image || "",
      imageAlt: s.imageAlt || "",
      backgroundColor: s.backgroundColor || "#0f172a",
      textColor: s.textColor || "#ffffff",
      ctaText: s.ctaText || "",
      ctaUrl: s.ctaUrl || "",
    })),
    publishedAt: doc.publishedAt || null,
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
    canonicalUrl: doc.canonicalUrl || "",
    noindex: doc.noindex || false,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function getPublishedStories({ page = 1, perPage = 12 } = {}) {
  try {
    await connectDB();
    const skip = (page - 1) * perPage;
    const docs = await Story.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(perPage)
      .lean();
    return docs.map(normalizeDbStory);
  } catch (error) {
    console.error("[stories] Failed to load published stories:", error);
    return [];
  }
}

export async function getPublishedStoryBySlug(slug) {
  try {
    await connectDB();
    const doc = await Story.findOne({ slug, status: "published" }).lean();
    return normalizeDbStory(doc);
  } catch (error) {
    console.error(`[stories] Failed to load story "${slug}":`, error);
    return null;
  }
}

export async function getAllPublishedStorySlugs() {
  try {
    await connectDB();
    const docs = await Story.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .select("slug")
      .lean();
    return docs.map((d) => d.slug);
  } catch (error) {
    console.error("[stories] Failed to load story slugs:", error);
    return [];
  }
}

export async function getRelatedStories(story, { limit = 3 } = {}) {
  try {
    if (!story) return [];
    await connectDB();
    const filter = {
      status: "published",
      slug: { $ne: story.slug },
    };
    if (story.category) filter.category = story.category;
    const docs = await Story.find(filter)
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();
    return docs.map(normalizeDbStory);
  } catch (error) {
    console.error("[stories] Failed to load related stories:", error);
    return [];
  }
}
