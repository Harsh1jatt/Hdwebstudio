import { siteConfig } from "@/config/site";

// ============================================================
// METADATA GENERATION
// ============================================================

/**
 * Generate Next.js metadata for a page.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedAt,
  updatedAt,
  author,
  noindex = false,
}) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;
  const ogImage = image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.assets?.ogImage || "/logo.svg"}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title || siteConfig.name }],
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
      ...(updatedAt ? { modifiedTime: updatedAt } : {}),
      ...(author ? { authors: [author] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}

/**
 * Generate metadata for a CMS entity (blog post, service, project, story).
 */
export function generateCmsMetadata({
  entity,
  entityType = "article",
  path,
}) {
  const seoTitle = entity.seoTitle || entity.title;
  const seoDescription = entity.seoDescription || entity.excerpt || entity.description || entity.shortDescription || "";
  const ogImage = entity.ogImage || entity.featuredImage || entity.posterImage || "";

  return generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    path: path || `/${entityType}/${entity.slug}`,
    image: ogImage,
    type: entityType === "blog" || entityType === "article" ? "article" : "website",
    publishedAt: entity.publishedAt || undefined,
    updatedAt: entity.updatedAt || undefined,
    author: entity.author || siteConfig.name,
    noindex: entity.noindex || false,
  });
}

// ============================================================
// STRUCTURED DATA
// ============================================================

/**
 * Organization schema (site-wide).
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.assets?.logo || "/logo.svg"}`,
    description: siteConfig.description,
    address: siteConfig.address || undefined,
    contactPoint: siteConfig.phone ? {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
    } : undefined,
  };
}

/**
 * LocalBusiness schema for local SEO.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.assets?.logo || "/logo.svg"}`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
    geo: siteConfig.geo || undefined,
    areaServed: [
      { "@type": "City", name: "Ludhiana" },
      { "@type": "State", name: "Punjab" },
      { "@type": "Country", name: "India" },
    ],
    priceRange: "$$",
  };
}

/**
 * WebSite schema with search action.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

/**
 * BreadcrumbList schema.
 */
export function breadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${siteConfig.url}${item.url}` : undefined,
    })),
  };
}

/**
 * Article schema for blog posts.
 */
export function articleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt || "",
    author: { "@type": "Person", name: post.author || "Harshdeep" },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.assets?.logo || "/logo.svg"}` },
    },
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    ...(post.featuredImage ? { image: `${siteConfig.url}${post.featuredImage}` } : {}),
  };
}

/**
 * Service schema.
 */
export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title || service.name,
    description: service.seoDescription || service.shortDescription || service.description || "",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/services/${service.slug}`,
    areaServed: { "@type": "Country", name: "India" },
  };
}

/**
 * FAQPage schema (only when there are genuine Q&A items).
 */
export function faqSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question || faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.answer || faq.a },
    })),
  };
}

// ============================================================
// SEO ANALYSIS (Yoast-style)
// ============================================================

function countOccurrences(text, keyword) {
  if (!keyword || !text) return 0;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${escaped}\\b`, "gi");
  return (text.match(re) || []).length;
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Analyze SEO for any CMS entity.
 * Returns { score, signals, summary }.
 */
export function analyzeSeo({
  title = "",
  seoTitle = "",
  slug = "",
  seoDescription = "",
  excerpt = "",
  content = "",
  contentFormat = "html",
  focusKeyword = "",
  featuredImage = "",
  featuredImageAlt = "",
  canonicalUrl = "",
  ogImage = "",
  internalLinks = 0,
  externalLinks = 0,
  imagesMissingAlt = 0,
  totalImages = 0,
  headings = [],
}) {
  const effectiveTitle = seoTitle || title;
  const effectiveMeta = seoDescription || excerpt;
  const plainContent = contentFormat === "html" ? stripHtml(content) : content;
  const wordCount = plainContent ? plainContent.split(/\s+/).filter(Boolean).length : 0;
  const keyword = focusKeyword.trim().toLowerCase();

  const signals = [];

  // 1. Title exists
  signals.push({
    label: "SEO title exists",
    status: effectiveTitle ? "good" : "problem",
    message: effectiveTitle ? "SEO title is set." : "Add an SEO title for better search visibility.",
    hint: effectiveTitle ? undefined : "Use a clear, descriptive title under 60 characters that includes your main topic.",
  });

  // 2. Title length
  const titleLen = effectiveTitle.length;
  signals.push({
    label: "Title length",
    status: titleLen >= 30 && titleLen <= 60 ? "good" : titleLen > 0 ? "warning" : "problem",
    message: titleLen === 0 ? "Title is empty." : titleLen < 30 ? `Title is short (${titleLen} chars). Aim for 30–60.` : titleLen > 60 ? `Title may be truncated in search results (${titleLen} chars). Aim for 30–60.` : `Good length (${titleLen} chars).`,
  });

  // 3. Meta description exists
  signals.push({
    label: "Meta description exists",
    status: effectiveMeta ? "good" : "warning",
    message: effectiveMeta ? "Meta description is set." : "Add a meta description for better search snippets.",
    hint: effectiveMeta ? undefined : "Write a 140–160 character summary that includes your primary topic naturally.",
  });

  // 4. Meta description length
  const metaLen = effectiveMeta.length;
  signals.push({
    label: "Meta description length",
    status: metaLen >= 120 && metaLen <= 160 ? "good" : metaLen > 0 ? "warning" : "problem",
    message: metaLen === 0 ? "No meta description." : metaLen < 120 ? `Short (${metaLen} chars). Aim for 120–160.` : metaLen > 160 ? `May be truncated in search results (${metaLen} chars). Aim for 120–160.` : `Good length (${metaLen} chars).`,
  });

  // 5. Slug format
  const slugValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  signals.push({
    label: "URL slug format",
    status: slugValid && slug ? "good" : "problem",
    message: slugValid ? "Slug uses clean lowercase-hyphenated format." : "Use lowercase letters, numbers, and hyphens only.",
  });

  // 6. Focus keyword
  if (keyword) {
    signals.push({
      label: "Keyword in title",
      status: effectiveTitle.toLowerCase().includes(keyword) ? "good" : "warning",
      message: effectiveTitle.toLowerCase().includes(keyword) ? "Focus keyword appears in the SEO title." : "Consider including the focus keyword in your title.",
    });
    signals.push({
      label: "Keyword in meta description",
      status: effectiveMeta.toLowerCase().includes(keyword) ? "good" : "warning",
      message: effectiveMeta.toLowerCase().includes(keyword) ? "Focus keyword appears in meta description." : "Consider including the focus keyword in the meta description.",
    });
    signals.push({
      label: "Keyword in URL",
      status: slug.toLowerCase().includes(keyword.replace(/\s+/g, "-")) ? "good" : "warning",
      message: slug.toLowerCase().includes(keyword.replace(/\s+/g, "-")) ? "Focus keyword appears in the URL." : "Consider including the focus keyword in the slug.",
    });
    const keywordCount = countOccurrences(plainContent, keyword);
    const density = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
    signals.push({
      label: "Keyword usage",
      status: keywordCount > 0 && density < 3 ? "good" : keywordCount === 0 ? "warning" : "warning",
      message: keywordCount === 0 ? "Focus keyword not found in content." : density > 3 ? `Keyword may be overused (~${density.toFixed(1)}%). Use naturally.` : `Keyword appears ${keywordCount}× in content (${density.toFixed(1)}% density).`,
      hint: keywordCount === 0 ? "Use the focus keyword naturally in the content body." : undefined,
    });
  } else {
    signals.push({
      label: "Focus keyword",
      status: "warning",
      message: "Set a primary focus keyword for targeted SEO analysis.",
    });
  }

  // 7. Content length
  signals.push({
    label: "Content length",
    status: wordCount >= 300 ? "good" : wordCount > 0 ? "warning" : "problem",
    message: wordCount === 0 ? "Add article content." : wordCount < 300 ? `Content is brief (${wordCount} words). Consider expanding.` : `${wordCount} words — good content depth.`,
  });

  // 8. Headings
  const h2Count = headings.filter((h) => h === 2).length;
  signals.push({
    label: "Heading structure",
    status: h2Count > 0 ? "good" : "warning",
    message: h2Count > 0 ? `${h2Count} H2 headings found.` : "Add H2 headings to structure the content.",
  });

  // 9. Featured image
  signals.push({
    label: "Featured image",
    status: featuredImage ? "good" : "warning",
    message: featuredImage ? "Featured image is set." : "Add a featured image for social sharing and visual appeal.",
  });

  // 10. Image alt text
  if (totalImages > 0) {
    signals.push({
      label: "Image alt text",
      status: imagesMissingAlt === 0 ? "good" : "warning",
      message: imagesMissingAlt === 0 ? "All images have alt text." : `${imagesMissingAlt} image(s) missing alt text.`,
    });
  }

  // 11. Internal links
  signals.push({
    label: "Internal links",
    status: internalLinks > 0 ? "good" : "warning",
    message: internalLinks > 0 ? `${internalLinks} internal link(s) found.` : "Add internal links to related content for better SEO.",
  });

  // 12. Canonical URL
  signals.push({
    label: "Canonical URL",
    status: canonicalUrl ? "good" : "warning",
    message: canonicalUrl ? "Canonical URL is set." : "Set a canonical URL to prevent duplicate content issues.",
  });

  // 13. OG image
  signals.push({
    label: "Open Graph image",
    status: ogImage || featuredImage ? "good" : "warning",
    message: ogImage || featuredImage ? "OG image is available for social sharing." : "Add an OG image for better social media previews.",
  });

  // Summary
  const good = signals.filter((s) => s.status === "good").length;
  const warning = signals.filter((s) => s.status === "warning").length;
  const problem = signals.filter((s) => s.status === "problem").length;
  const total = signals.length;
  const score = total > 0 ? Math.round((good / total) * 100) : 0;

  return {
    score,
    signals,
    summary: { good, warning, problem, score, total },
    meta: {
      titleLength: titleLen,
      metaLength,
      wordCount,
      headingCount: headings.length,
    },
  };
}
