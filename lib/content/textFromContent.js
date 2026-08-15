/**
 * Extract plain text from HTML or Markdown content for excerpts, reading time, SEO analysis.
 */

export function stripHtmlToText(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripMarkdownToText(markdown = "") {
  return String(markdown)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[>*_#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function contentToPlainText(content = "", format = "markdown") {
  if (!content) return "";
  if (format === "html" || looksLikeHtml(content)) {
    return stripHtmlToText(content);
  }
  return stripMarkdownToText(content);
}

export function looksLikeHtml(content = "") {
  const trimmed = String(content).trim();
  if (!trimmed) return false;
  return /^<[a-z][\s\S]*>/i.test(trimmed) || /<(p|h[1-6]|ul|ol|blockquote|div|article)\b/i.test(trimmed);
}

export function estimateReadingTimeMinutes(content = "", format = "markdown") {
  const text = contentToPlainText(content, format);
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.round(words / 220));
}

export function deriveExcerptFromContent(content = "", format = "markdown", maxLen = 180) {
  const text = contentToPlainText(content, format);
  if (!text) return "";
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}...`;
}

export function countWords(text = "") {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}
