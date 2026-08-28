import sanitizeHtml from "sanitize-html";

/**
 * HD Web Studios — Smart Paste Engine
 * Intelligently converts messy pasted content from Google Docs, MS Word, ChatGPT, Claude, Notion, etc.
 * into clean, semantic, secure HTML suitable for Tiptap and the blog renderer.
 */

export function cleanPastedHtml(html = "") {
  if (!html || typeof html !== "string") return "";

  let cleaned = html;

  // 1. Remove Word / Office HTML comments and conditional wrappers
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/gi, "");
  cleaned = cleaned.replace(/<!\[if[\s\S]*?!\[endif\]>/gi, "");
  cleaned = cleaned.replace(/<xml[\s\S]*?<\/xml>/gi, "");
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, "");
  cleaned = cleaned.replace(/<meta[\s\S]*?>/gi, "");
  cleaned = cleaned.replace(/<link[\s\S]*?>/gi, "");

  // 2. Remove Word specific tags like <o:p>, <w:*>, <m:*>
  cleaned = cleaned.replace(/<\/?\w+:[^>]*>/gi, "");

  // 3. Normalize Headings:
  // Post Title already supplies the page H1. Convert any body H1 to H2 to protect heading hierarchy.
  cleaned = cleaned.replace(/<h1(\s+[^>]*)?>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");

  // 4. Clean common AI artifact text
  cleaned = cleaned.replace(/^Sure, here is (a|the) (blog post|article|content)[\s\S]*?:/i, "");
  cleaned = cleaned.replace(/^Here's a comprehensive guide[\s\S]*?:/i, "");

  // 5. Sanitize HTML and strip dangerous tags, attributes, inline styles, and event handlers
  const sanitized = sanitizeHtml(cleaned, {
    allowedTags: [
      "h2", "h3", "h4", "h5", "h6",
      "p", "br", "strong", "b", "em", "i", "u", "s", "strike",
      "ul", "ol", "li",
      "blockquote", "pre", "code",
      "a", "img", "hr",
      "table", "thead", "tbody", "tr", "th", "td",
      "figure", "figcaption",
      "div", "span", "iframe",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading", "class"],
      iframe: ["src", "width", "height", "allowfullscreen", "title", "class"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
      div: ["class"],
      p: ["class"],
      span: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        if (!href || href.startsWith("javascript:") || href.startsWith("data:")) {
          return { tagName: "span", text: "" };
        }
        if (attribs.target === "_blank") {
          attribs.rel = "noopener noreferrer";
        }
        return { tagName, attribs };
      },
      img: (tagName, attribs) => {
        const src = attribs.src || "";
        if (!src || src.startsWith("javascript:")) {
          return { tagName: "span", text: "" };
        }
        if (!attribs.alt) {
          attribs.alt = "Article image";
        }
        attribs.loading = "lazy";
        return { tagName, attribs };
      },
      iframe: (tagName, attribs) => {
        const src = attribs.src || "";
        const isAllowedVideo =
          src.includes("youtube.com/embed") ||
          src.includes("youtube-nocookie.com/embed") ||
          src.includes("player.vimeo.com/video");
        if (!isAllowedVideo) {
          return { tagName: "div", text: "" };
        }
        return { tagName, attribs };
      },
    },
  });

  // 6. Remove empty paragraphs or spans (except line breaks)
  const trimmed = sanitized
    .replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, "")
    .replace(/<span>\s*(?:&nbsp;|\s)*<\/span>/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return trimmed;
}

/**
 * Authoritative external references map for semantic topic suggestions.
 */
export const AUTHORITATIVE_REFERENCES = [
  {
    topic: "SEO & Search",
    keywords: ["seo", "google search", "crawling", "indexing", "ranking", "sitemap", "robots.txt"],
    source: "Google Search Central",
    url: "https://developers.google.com/search/docs",
    description: "Official Google documentation for search essentials, crawling, and indexing.",
  },
  {
    topic: "Google Business Profile",
    keywords: ["google business", "google maps", "local seo", "local pack", "citations"],
    source: "Google Business Profile Help",
    url: "https://support.google.com/business",
    description: "Official guidelines for verifying and optimizing Google Business Profiles.",
  },
  {
    topic: "Web Performance & Core Web Vitals",
    keywords: ["core web vitals", "lcp", "cls", "inp", "page speed", "performance", "lighthouse"],
    source: "web.dev (Google)",
    url: "https://web.dev/explore/fast",
    description: "Official guidance from Google on Core Web Vitals and user-centric performance.",
  },
  {
    topic: "Next.js Framework",
    keywords: ["next.js", "nextjs", "app router", "server components", "react 19"],
    source: "Next.js Official Documentation",
    url: "https://nextjs.org/docs",
    description: "Official architecture docs for App Router, caching, and server actions.",
  },
  {
    topic: "Web Accessibility (A11y)",
    keywords: ["accessibility", "wcag", "aria", "screen reader", "contrast"],
    source: "W3C / WAI",
    url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
    description: "Web Content Accessibility Guidelines (WCAG) international standards.",
  },
  {
    topic: "Analytics & Measurement",
    keywords: ["google analytics", "ga4", "tag manager", "conversion tracking", "gtag"],
    source: "Google Analytics Help",
    url: "https://support.google.com/analytics",
    description: "Official guide on GA4 event tracking and conversion measurement.",
  },
];

export function getAuthoritativeLinkSuggestions(content = "") {
  const lowerContent = content.toLowerCase();
  const matched = [];

  for (const ref of AUTHORITATIVE_REFERENCES) {
    const hasMatch = ref.keywords.some((kw) => lowerContent.includes(kw));
    if (hasMatch) {
      matched.push(ref);
    }
  }

  return matched.slice(0, 4);
}
