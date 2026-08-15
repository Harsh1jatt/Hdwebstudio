import {
  contentToPlainText,
  countWords,
  looksLikeHtml,
  stripHtmlToText,
} from "@/lib/content/textFromContent";

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const META_MIN = 120;
const META_MAX = 160;

function status(ok, warn) {
  if (ok) return "good";
  if (warn) return "warning";
  return "problem";
}

function countKeyword(text, keyword) {
  if (!keyword || !text) return 0;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${escaped}\\b`, "gi");
  const matches = text.match(re);
  return matches ? matches.length : 0;
}

function extractHeadingsFromHtml(html) {
  const headings = [];
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = re.exec(html))) {
    headings.push({
      level: parseInt(match[1], 10),
      text: stripHtmlToText(match[2]),
    });
  }
  return headings;
}

function extractHeadingsFromMarkdown(md) {
  const headings = [];
  const lines = String(md).split("\n");
  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+)$/);
    if (m) headings.push({ level: m[1].length, text: m[2].trim() });
  }
  return headings;
}

function extractImagesFromHtml(html) {
  const images = [];
  const re = /<img[^>]*>/gi;
  let match;
  while ((match = re.exec(html))) {
    const tag = match[0];
    const alt = tag.match(/alt=["']([^"']*)["']/i)?.[1] ?? "";
    const src = tag.match(/src=["']([^"']*)["']/i)?.[1] ?? "";
    images.push({ alt, src });
  }
  return images;
}

function extractLinksFromHtml(html) {
  const links = [];
  const re = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = re.exec(html))) {
    links.push({ href: match[1], text: stripHtmlToText(match[2]) });
  }
  return links;
}

function splitSentences(text) {
  return text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
}

function splitParagraphs(text) {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

/**
 * Analyze blog post SEO signals (heuristic — not a Google ranking score).
 */
export function analyzeBlogSeo({
  title = "",
  slug = "",
  seoTitle = "",
  seoDescription = "",
  excerpt = "",
  content = "",
  contentFormat = "markdown",
  focusKeyword = "",
  secondaryKeywords = [],
  featuredImage = "",
  featuredImageAlt = "",
  status: postStatus = "draft",
  originalSlug = "",
  slugAvailable = true,
}) {
  const effectiveSeoTitle = seoTitle.trim() || title.trim();
  const effectiveMeta = seoDescription.trim() || excerpt.trim();
  const plain = contentToPlainText(content, contentFormat);
  const wordCount = countWords(plain);
  const isHtml = contentFormat === "html" || looksLikeHtml(content);

  const headings = isHtml
    ? extractHeadingsFromHtml(content)
    : extractHeadingsFromMarkdown(content);
  const images = isHtml ? extractImagesFromHtml(content) : [];
  const links = isHtml ? extractLinksFromHtml(content) : [];

  const intro = plain.slice(0, 300);
  const keyword = focusKeyword.trim().toLowerCase();
  const keywordInTitle = keyword ? effectiveSeoTitle.toLowerCase().includes(keyword) : null;
  const keywordNearStart = keyword ? effectiveSeoTitle.toLowerCase().indexOf(keyword) <= 20 : null;
  const keywordInSlug = keyword ? slug.toLowerCase().includes(keyword.replace(/\s+/g, "-")) : null;
  const keywordInMeta = keyword ? effectiveMeta.toLowerCase().includes(keyword) : null;
  const keywordInIntro = keyword ? intro.toLowerCase().includes(keyword) : null;
  const keywordCount = keyword ? countKeyword(plain.toLowerCase(), keyword) : 0;
  const keywordDensity = wordCount > 0 && keyword ? (keywordCount / wordCount) * 100 : 0;

  const h1Count = headings.filter((h) => h.level === 1).length;
  const h2Count = headings.filter((h) => h.level === 2).length;
  const h3Count = headings.filter((h) => h.level === 3).length;

  let hierarchyIssue = null;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level > headings[i - 1].level + 1) {
      hierarchyIssue = `H${headings[i].level} appears after H${headings[i - 1].level} without intermediate level`;
      break;
    }
  }

  const sentences = splitSentences(plain);
  const longSentences = sentences.filter((s) => s.split(/\s+/).length > 25).length;
  const paragraphs = isHtml
    ? content.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || []
    : plain.split(/\n\n+/);
  const longParagraphs = paragraphs.filter((p) => {
    const t = typeof p === "string" ? stripHtmlToText(p) : stripHtmlToText(p);
    return countWords(t) > 150;
  }).length;

  const internalLinks = links.filter((l) => l.href.startsWith("/") && !l.href.startsWith("//"));
  const externalLinks = links.filter(
    (l) => l.href.startsWith("http") && !l.href.includes("hdwebstudios")
  );
  const imagesMissingAlt = images.filter((img) => !img.alt?.trim()).length;
  const hasFeaturedImage = Boolean(featuredImage?.trim());

  const signals = [];

  // Title
  signals.push({
    section: "title",
    label: "SEO title exists",
    status: effectiveSeoTitle ? "good" : "problem",
    message: effectiveSeoTitle ? "SEO title is set" : "Add an SEO title or post title",
  });
  signals.push({
    section: "title",
    label: "Title length",
    status: status(
      effectiveSeoTitle.length >= TITLE_MIN && effectiveSeoTitle.length <= TITLE_MAX,
      effectiveSeoTitle.length > 0 && (effectiveSeoTitle.length < TITLE_MIN || effectiveSeoTitle.length > TITLE_MAX)
    ),
    message:
      effectiveSeoTitle.length === 0
        ? "Title is empty"
        : effectiveSeoTitle.length < TITLE_MIN
          ? `Title is short (${effectiveSeoTitle.length} chars). Recommended ${TITLE_MIN}–${TITLE_MAX}`
          : effectiveSeoTitle.length > TITLE_MAX
            ? `Title may be truncated (${effectiveSeoTitle.length} chars). Recommended ${TITLE_MIN}–${TITLE_MAX}`
            : `Good length (${effectiveSeoTitle.length} chars)`,
  });

  if (/[A-Z]{4,}/.test(effectiveSeoTitle)) {
    signals.push({
      section: "title",
      label: "Capitalization",
      status: "warning",
      message: "Avoid excessive capitalization in the title",
    });
  }

  // Meta description
  signals.push({
    section: "meta",
    label: "Meta description exists",
    status: effectiveMeta ? "good" : "warning",
    message: effectiveMeta ? "Meta description is set" : "Add a meta description for better snippets",
  });
  signals.push({
    section: "meta",
    label: "Meta description length",
    status: status(
      effectiveMeta.length >= META_MIN && effectiveMeta.length <= META_MAX,
      effectiveMeta.length > 0
    ),
    message:
      effectiveMeta.length === 0
        ? "No meta description"
        : effectiveMeta.length < META_MIN
          ? `Short (${effectiveMeta.length} chars). Aim for ${META_MIN}–${META_MAX}`
          : effectiveMeta.length > META_MAX
            ? `Long (${effectiveMeta.length} chars). May be truncated`
            : `Good length (${effectiveMeta.length} chars)`,
  });

  // Slug
  const slugValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  signals.push({
    section: "url",
    label: "URL slug format",
    status: slugValid && slug ? "good" : "problem",
    message: slugValid ? "Slug is lowercase and hyphen-separated" : "Use lowercase letters, numbers, and hyphens only",
  });
  if (!slugAvailable) {
    signals.push({
      section: "url",
      label: "Slug availability",
      status: "problem",
      message: "This slug is already in use by another post",
    });
  }
  if (postStatus === "published" && originalSlug && originalSlug !== slug) {
    signals.push({
      section: "url",
      label: "Published slug change",
      status: "warning",
      message: "Changing a published slug may break existing links. Consider a redirect.",
    });
  }

  // Focus keyword
  if (keyword) {
    signals.push({
      section: "keyword",
      label: "Keyword in SEO title",
      status: keywordInTitle ? "good" : "warning",
      message: keywordInTitle ? "Focus keyword appears in title" : "Consider including focus keyword in title",
    });
    signals.push({
      section: "keyword",
      label: "Keyword near beginning",
      status: keywordNearStart ? "good" : "warning",
      message: keywordNearStart
        ? "Keyword appears near the start of the title"
        : "Keyword placement in title could be improved",
    });
    signals.push({
      section: "keyword",
      label: "Keyword in URL",
      status: keywordInSlug ? "good" : "warning",
      message: keywordInSlug ? "Keyword appears in slug" : "Consider including keyword in slug",
    });
    signals.push({
      section: "keyword",
      label: "Keyword in meta description",
      status: keywordInMeta ? "good" : "warning",
      message: keywordInMeta ? "Keyword in meta description" : "Consider keyword in meta description",
    });
    signals.push({
      section: "keyword",
      label: "Keyword in introduction",
      status: keywordInIntro ? "good" : "warning",
      message: keywordInIntro ? "Keyword in opening content" : "Use keyword naturally in the introduction",
    });
    signals.push({
      section: "keyword",
      label: "Keyword density",
      status:
        keywordCount === 0
          ? "warning"
          : keywordDensity > 3
            ? "warning"
            : "good",
      message:
        keywordCount === 0
          ? "Focus keyword not found in content"
          : keywordDensity > 3
            ? `Keyword may be overused (~${keywordDensity.toFixed(1)}%). Use naturally`
            : `Reasonable keyword presence (${keywordCount}× in content)`,
    });
  } else {
    signals.push({
      section: "keyword",
      label: "Focus keyword",
      status: "warning",
      message: "Set a primary focus keyword for targeted analysis",
    });
  }

  // Content
  signals.push({
    section: "content",
    label: "Content length",
    status: wordCount >= 300 ? "good" : wordCount > 0 ? "warning" : "problem",
    message:
      wordCount === 0
        ? "Add article content"
        : wordCount < 300
          ? `Content is brief (${wordCount} words). Expand if the topic needs depth`
          : `${wordCount} words`,
  });
  signals.push({
    section: "content",
    label: "Heading structure",
    status: h2Count > 0 || headings.length === 0 ? "good" : "warning",
    message:
      headings.length === 0
        ? "No headings in content — use H2/H3 to structure the article"
        : h2Count > 0
          ? `${h2Count} H2, ${h3Count} H3 headings`
          : "Add H2 headings to break up content",
  });
  if (h1Count > 1) {
    signals.push({
      section: "content",
      label: "Multiple H1 elements",
      status: "warning",
      message: `${h1Count} H1 tags found. Post title is usually the only H1`,
    });
  } else if (h1Count === 1) {
    signals.push({
      section: "content",
      label: "H1 in content",
      status: "warning",
      message: "Content contains an H1. Post title is typically the page H1 — prefer H2+ in body",
    });
  }
  if (hierarchyIssue) {
    signals.push({
      section: "content",
      label: "Heading hierarchy",
      status: "warning",
      message: hierarchyIssue,
    });
  }

  // Readability
  signals.push({
    section: "readability",
    label: "Sentence length",
    status: longSentences <= 2 ? "good" : "warning",
    message:
      longSentences === 0
        ? "Sentences are concise"
        : `${longSentences} sentence(s) are longer than recommended`,
  });
  signals.push({
    section: "readability",
    label: "Paragraph length",
    status: longParagraphs <= 2 ? "good" : "warning",
    message:
      longParagraphs === 0
        ? "Paragraphs are well-sized"
        : `${longParagraphs} paragraph(s) are longer than recommended`,
  });

  // Images
  if (images.length > 0 || hasFeaturedImage) {
    signals.push({
      section: "images",
      label: "Featured image",
      status: hasFeaturedImage ? "good" : "warning",
      message: hasFeaturedImage ? "Featured image set" : "Add a featured image for social sharing",
    });
    if (imagesMissingAlt > 0) {
      signals.push({
        section: "images",
        label: "Image alt text",
        status: "warning",
        message: `${imagesMissingAlt} image(s) missing alt text`,
      });
    } else if (images.length > 0) {
      signals.push({
        section: "images",
        label: "Image alt text",
        status: "good",
        message: "All content images have alt text",
      });
    }
    if (featuredImage && !featuredImageAlt?.trim()) {
      signals.push({
        section: "images",
        label: "Featured image alt",
        status: "warning",
        message: "Featured image is missing alt text",
      });
    }
  } else {
    signals.push({
      section: "images",
      label: "Images",
      status: "warning",
      message: "Consider adding images to improve engagement",
    });
  }

  // Links
  signals.push({
    section: "links",
    label: "Internal links",
    status: internalLinks.length > 0 ? "good" : "warning",
    message:
      internalLinks.length > 0
        ? `${internalLinks.length} internal link(s)`
        : "Add links to services, portfolio, or related posts",
  });
  if (externalLinks.length > 0) {
    signals.push({
      section: "links",
      label: "External links",
      status: "good",
      message: `${externalLinks.length} external reference(s)`,
    });
  }

  const good = signals.filter((s) => s.status === "good").length;
  const warning = signals.filter((s) => s.status === "warning").length;
  const problem = signals.filter((s) => s.status === "problem").length;
  const total = signals.length;
  const score = total > 0 ? Math.round((good / total) * 100) : 0;

  return {
    signals,
    summary: { good, warning, problem, score, total },
    meta: {
      seoTitleLength: effectiveSeoTitle.length,
      metaLength: effectiveMeta.length,
      wordCount,
      headingCounts: { h1: h1Count, h2: h2Count, h3: h3Count },
    },
  };
}

export const SEO_SECTIONS = [
  { id: "title", label: "Title" },
  { id: "meta", label: "Meta Description" },
  { id: "url", label: "URL" },
  { id: "keyword", label: "Focus Keyword" },
  { id: "content", label: "Content" },
  { id: "readability", label: "Readability" },
  { id: "images", label: "Images" },
  { id: "links", label: "Links" },
];
