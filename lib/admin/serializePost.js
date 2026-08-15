import {
  contentToPlainText,
  deriveExcerptFromContent,
  estimateReadingTimeMinutes,
} from "@/lib/content/textFromContent";

export function serializePost(doc, { includeContent = false } = {}) {
  const base = {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt || "",
    featuredImage: doc.featuredImage || "",
    featuredImageAlt: doc.featuredImageAlt || "",
    category: doc.category || "",
    tags: doc.tags || [],
    author: doc.author || "",
    status: doc.status,
    publishedAt: doc.publishedAt || null,
    readingTime: doc.readingTime || 0,
    contentFormat: doc.contentFormat || "markdown",
    focusKeyword: doc.focusKeyword || "",
    secondaryKeywords: doc.secondaryKeywords || [],
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
  if (includeContent) {
    base.content = doc.content || "";
  }
  return base;
}

export function derivePostMetrics(content, contentFormat = "markdown", excerpt = "") {
  const readingTime = estimateReadingTimeMinutes(content, contentFormat);
  const derivedExcerpt =
    excerpt?.trim() || deriveExcerptFromContent(content, contentFormat);
  return { readingTime, excerpt: derivedExcerpt };
}

export { contentToPlainText };
