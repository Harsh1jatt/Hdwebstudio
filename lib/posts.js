import connectDB from "./db";
import Post from "@/models/Post";
import { siteConfig } from "@/config/site";

import { posts as staticPosts, getPost as getStaticPost, getAllPostSlugs as getStaticPostSlugs } from "./posts-data";

function normalizeDbPost(doc) {
  if (!doc) return null;
  return {
    id: doc._id?.toString() || doc.slug,
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
    author: doc.author || "Harshdeep",
    status: doc.status || "published",
    publishedAt: doc.publishedAt || null,
    readingTime: doc.readingTime || 5,
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
    updatedAt: doc.updatedAt || doc.publishedAt,
    createdAt: doc.createdAt || doc.publishedAt,
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

function getStaticPublishedPosts({ page = 1, perPage = 6, category } = {}) {
  let filtered = staticPosts;
  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  const skip = (page - 1) * perPage;
  return filtered.slice(skip, skip + perPage).map((p) => withFallbackFields(normalizeDbPost(p)));
}

async function getDbPublishedCount() {
  await connectDB();
  return Post.countDocuments({ status: "published" });
}

export async function getPublishedPosts({ page = 1, perPage = 6, category } = {}) {
  try {
    const totalCount = await getDbPublishedCount();
    if (totalCount === 0) return getStaticPublishedPosts({ page, perPage, category });

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
    console.error("[posts] Failed to load published posts from DB, using static fallback:", error);
    return getStaticPublishedPosts({ page, perPage, category });
  }
}

export async function getPublishedPostBySlug(slug) {
  try {
    const totalCount = await getDbPublishedCount();
    if (totalCount === 0) {
      const fallback = getStaticPost(slug);
      return fallback ? withFallbackFields(normalizeDbPost(fallback)) : null;
    }

    const doc = await Post.findOne({ slug, status: "published" }).lean();
    if (!doc) {
      const fallback = getStaticPost(slug);
      return fallback ? withFallbackFields(normalizeDbPost(fallback)) : null;
    }
    return withFallbackFields(normalizeDbPost(doc));
  } catch (error) {
    console.error(`[posts] Failed to load post "${slug}" from DB, using static fallback:`, error);
    const fallback = getStaticPost(slug);
    return fallback ? withFallbackFields(normalizeDbPost(fallback)) : null;
  }
}

export async function getAllPublishedPostSlugs() {
  try {
    const totalCount = await getDbPublishedCount();
    if (totalCount === 0) return getStaticPostSlugs();

    const docs = await Post.find({ status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .select("slug")
      .lean();

    if (docs && docs.length > 0) {
      return docs.map((d) => d.slug);
    }
    return getStaticPostSlugs();
  } catch (error) {
    console.error("[posts] Failed to load published post slugs from DB, using static fallback:", error);
    return getStaticPostSlugs();
  }
}

export async function getRelatedPublishedPosts(post, { limit = 3 } = {}) {
  try {
    if (!post) return [];
    const totalCount = await getDbPublishedCount();
    if (totalCount === 0) {
      return staticPosts
        .filter((p) => p.slug !== post.slug)
        .slice(0, limit)
        .map((p) => withFallbackFields(normalizeDbPost(p)));
    }

    const filter = { status: "published", slug: { $ne: post.slug } };

    const or = [];
    if (post.category) or.push({ category: post.category });
    if (post.tags && post.tags.length > 0) or.push({ tags: { $in: post.tags } });

    if (or.length === 0) {
      const docs = await Post.find(filter).sort({ publishedAt: -1 }).limit(limit).lean();
      return docs.map((d) => withFallbackFields(normalizeDbPost(d)));
    }

    const docs = await Post.find({ ...filter, $or: or })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return docs.map((d) => withFallbackFields(normalizeDbPost(d)));
  } catch (error) {
    console.error("[posts] Failed to load related posts, using static fallback:", error);
    return staticPosts
      .filter((p) => p.slug !== post.slug)
      .slice(0, limit)
      .map((p) => withFallbackFields(normalizeDbPost(p)));
  }
}

export async function getFeaturedAndLatestPublishedPosts() {
  const perPage = 6;
  try {
    const totalCount = await getDbPublishedCount();
    if (totalCount === 0) {
      const normalized = staticPosts.map((d) => withFallbackFields(normalizeDbPost(d)));
      return {
        featured: normalized.slice(0, 3),
        latest: normalized.slice(3),
      };
    }

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
    console.error("[posts] Failed to load featured/latest posts from DB, using static fallback:", error);
    const normalized = staticPosts.map((d) => withFallbackFields(normalizeDbPost(d)));
    return {
      featured: normalized.slice(0, 3),
      latest: normalized.slice(3),
    };
  }
}

