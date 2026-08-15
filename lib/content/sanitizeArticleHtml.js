import sanitizeHtml from "sanitize-html";
import { looksLikeHtml } from "@/lib/content/textFromContent";

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "strong", "b", "em", "i", "u", "s", "strike",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "img", "hr",
  "table", "thead", "tbody", "tr", "th", "td",
  "figure", "figcaption",
  "div", "span",
  "iframe",
];

const ALLOWED_ATTRIBUTES = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "title", "width", "height", "loading", "class"],
  iframe: ["src", "width", "height", "allowfullscreen", "title", "class"],
  th: ["colspan", "rowspan"],
  td: ["colspan", "rowspan"],
  "*": ["class"],
};

function isSafeUrl(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.startsWith("/")) return true;
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) return true;
  return false;
}

export function sanitizeArticleHtml(html = "") {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      img: ["http", "https"],
      iframe: ["https"],
    },
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        if (!isSafeUrl(href)) delete attribs.href;
        if (attribs.target === "_blank") {
          attribs.rel = "noopener noreferrer";
        }
        return { tagName, attribs };
      },
      img: (tagName, attribs) => {
        if (!isSafeUrl(attribs.src)) delete attribs.src;
        if (!attribs.loading) attribs.loading = "lazy";
        return { tagName, attribs };
      },
      iframe: (tagName, attribs) => {
        const src = attribs.src || "";
        const allowed =
          src.includes("youtube.com/embed") ||
          src.includes("youtube-nocookie.com/embed");
        if (!allowed) return { tagName: "div", text: "" };
        return { tagName, attribs };
      },
    },
  });
}

export function getContentFormat(content, contentFormat) {
  if (contentFormat === "html" || contentFormat === "markdown") return contentFormat;
  return looksLikeHtml(content) ? "html" : "markdown";
}
