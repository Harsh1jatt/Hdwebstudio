import connectDB from "./db";
import Post from "@/models/Post";
import { siteConfig } from "@/config/site";

function normalizeDbPost(doc) {
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt || "",
    content: doc.content || "",
    contentFormat: doc.contentFormat || "markdown",
    focusKeyword: doc.focusKeyword || "",
    secondaryKeywords: Array.isArray(doc.secondaryKeywords) ? doc.secondaryKeywords : [],
    featuredImage: doc.featuredImage || "",
    featuredImageAlt: doc.featuredImageAlt || "",
    category: doc.category || "",
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    author: doc.author || "",
    status: doc.status,
    publishedAt: doc.publishedAt || null,
    readingTime: doc.readingTime || 0,
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
    updatedAt: doc.updatedAt,
    createdAt: doc.createdAt,
    _raw: doc,
  };
}

function withFallbackFields(post) {
  if (!post) return null;
  return {
    ...post,
    featuredImage:
      post.featuredImage || siteConfig.assets.projectPlaceholder || "",
  };
}

function getStaticPublishedPosts() {
  return [];
}

async function getDbPublishedCount() {
  await connectDB();
  return Post.countDocuments({ status: "published" });
}

export async function getPublishedPosts({ page = 1, perPage = 6, category } = {}) {
  try {
    const totalCount = await getDbPublishedCount();
    if (totalCount === 0) return getStaticPublishedPosts();

    const filter = { status: "published" };
    if (category) filter.category = category;

    const skip = (page - 1) * perPage;
    const docs = await Post.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .lean();

    return docs.map((d) => withFallbackFields(normalizeDbPost(d)));
  } catch (error) {
    console.error("[posts] Failed to load published posts from DB:", error);
    return getStaticPublishedPosts();
  }
}

export async function getPublishedPostBySlug(slug) {
  try {
    const totalCount = await getDbPublishedCount();
    if (totalCount === 0) return null;

    const doc = await Post.findOne({ slug, status: "published" }).lean();
    if (!doc) return null;
    return withFallbackFields(normalizeDbPost(doc));
  } catch (error) {
    console.error(`[posts] Failed to load post "${slug}" from DB:`, error);
    return null;
  }
}

export async function getAllPublishedPostSlugs() {
  try {
    const totalCount = await getDbPublishedCount();
    if (totalCount === 0) return [];

    const docs = await Post.find({ status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .select("slug")
      .lean();

    return docs.map((d) => d.slug);
  } catch (error) {
    console.error("[posts] Failed to load published post slugs from DB:", error);
    return [];
  }
}

export async function getRelatedPublishedPosts(post, { limit = 3 } = {}) {
  try {
    if (!post) return [];
    const filter = { status: "published", slug: { $ne: post.slug } };

    const or = [];
    if (post.category) or.push({ category: post.category });
    if (post.tags && post.tags.length > 0) or.push({ tags: { $in: post.tags } });

    if (or.length === 0) return [];

    const docs = await Post.find({ ...filter, $or: or })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return docs.map((d) => withFallbackFields(normalizeDbPost(d)));
  } catch (error) {
    console.error("[posts] Failed to load related posts:", error);
    return [];
  }
}

export async function getFeaturedAndLatestPublishedPosts() {
  // Top 3 latest as "featured", plus next latest.
  const perPage = 6;
  try {
    const docs = await Post.find({ status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(perPage)
      .lean();

    const normalized = docs.map((d) => withFallbackFields(normalizeDbPost(d)));
    return {
      featured: normalized.slice(0, 3),
      latest: normalized.slice(3),
    };
  } catch (error) {
    console.error("[posts] Failed to load featured/latest posts from DB:", error);
    return { featured: [], latest: [] };
  }
}

