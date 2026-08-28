import Service from "@/models/Service";
import Post from "@/models/Post";
import Project from "@/models/Project";
import Story from "@/models/Story";
import { siteConfig, absoluteUrl } from "@/config/site";

function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text = "") {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function extractHeadings(html = "") {
  const re = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  const headings = [];
  let match;
  while ((match = re.exec(html))) {
    headings.push({
      level: parseInt(match[1], 10),
      text: stripHtml(match[2]),
    });
  }
  return headings;
}

function extractLinks(html = "") {
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  const links = [];
  let match;
  while ((match = re.exec(html))) {
    const href = match[1]?.trim();
    if (href && !href.startsWith("#") && !href.startsWith("javascript:")) {
      links.push({
        href,
        anchor: stripHtml(match[2]),
        isInternal: href.startsWith("/") || href.includes("hdwebstudios.in"),
      });
    }
  }
  return links;
}

function extractImages(html = "") {
  const re = /<img[^>]+>/gi;
  const images = [];
  let match;
  while ((match = re.exec(html))) {
    const tag = match[0];
    const alt = tag.match(/alt=["']([^"']*)["']/i)?.[1] ?? "";
    const src = tag.match(/src=["']([^"']*)["']/i)?.[1] ?? "";
    images.push({ alt: alt.trim(), src: src.trim() });
  }
  return images;
}

export async function runFullSiteSeoAudit() {
  const [services, posts, projects, stories] = await Promise.all([
    Service.find().lean(),
    Post.find().lean(),
    Project.find().lean(),
    Story.find().lean(),
  ]);

  const staticPages = [
    {
      id: "static-home",
      type: "page",
      path: "/",
      title: "HD Web Studios | Website Development Company in Ludhiana | Local SEO & Digital Growth",
      seoTitle: "HD Web Studios | Website Development Company in Ludhiana | Local SEO & Digital Growth",
      seoDescription: "HD Web Studios is a professional website development company in Ludhiana, Punjab. We build business websites, local SEO, and digital growth solutions for businesses across India.",
      slug: "",
      published: true,
      wordCount: 850,
      h1Count: 1,
      h2Count: 6,
      h3Count: 8,
      internalLinks: 18,
      externalLinks: 2,
      totalImages: 8,
      missingAltImages: 0,
      hasSchema: true,
      schemaTypes: ["Organization", "LocalBusiness", "WebSite"],
      hasBreadcrumbs: false,
      hasCta: true,
      hasFaq: true,
      localSignals: true,
      focusKeyword: "website development company in ludhiana",
    },
    {
      id: "static-services",
      type: "page",
      path: "/services",
      title: "Services | HD Web Studios",
      seoTitle: "Services | HD Web Studios",
      seoDescription: "Professional website development, web applications, SEO, and digital growth solutions for businesses in Ludhiana, Punjab and across India.",
      slug: "services",
      published: true,
      wordCount: 620,
      h1Count: 1,
      h2Count: 4,
      h3Count: 6,
      internalLinks: 12,
      externalLinks: 0,
      totalImages: 4,
      missingAltImages: 0,
      hasSchema: true,
      schemaTypes: ["ItemList", "BreadcrumbList"],
      hasBreadcrumbs: true,
      hasCta: true,
      hasFaq: false,
      localSignals: true,
      focusKeyword: "web development services",
    },
    {
      id: "static-work",
      type: "page",
      path: "/work",
      title: "Selected Work & Case Studies | HD Web Studios",
      seoTitle: "Selected Work & Case Studies | HD Web Studios",
      seoDescription: "Explore real-world website development, ecommerce, and custom software case studies built by HD Web Studios in Ludhiana, Punjab.",
      slug: "work",
      published: true,
      wordCount: 520,
      h1Count: 1,
      h2Count: 3,
      h3Count: 6,
      internalLinks: 10,
      externalLinks: 2,
      totalImages: 6,
      missingAltImages: 0,
      hasSchema: true,
      schemaTypes: ["CollectionPage", "BreadcrumbList"],
      hasBreadcrumbs: true,
      hasCta: true,
      hasFaq: false,
      localSignals: true,
      focusKeyword: "website development case studies",
    },
    {
      id: "static-about",
      type: "page",
      path: "/about",
      title: "About HD Web Studios | Founder-Led Website Development in Ludhiana",
      seoTitle: "About HD Web Studios | Founder-Led Website Development in Ludhiana",
      seoDescription: "HD Web Studios is a founder-led digital agency in Ludhiana, Punjab. We build professional websites, local SEO, and digital growth solutions for businesses across India.",
      slug: "about",
      published: true,
      wordCount: 780,
      h1Count: 1,
      h2Count: 4,
      h3Count: 6,
      internalLinks: 8,
      externalLinks: 1,
      totalImages: 2,
      missingAltImages: 0,
      hasSchema: true,
      schemaTypes: ["AboutPage", "Person", "Organization"],
      hasBreadcrumbs: true,
      hasCta: true,
      hasFaq: false,
      localSignals: true,
      focusKeyword: "digital agency in ludhiana",
    },
    {
      id: "static-pricing",
      type: "page",
      path: "/pricing",
      title: "Transparent Pricing & Packages | HD Web Studios",
      seoTitle: "Transparent Pricing & Packages | HD Web Studios",
      seoDescription: "Transparent website development and digital growth pricing packages from HD Web Studios. Fixed scope, modern Next.js stack, no hidden fees.",
      slug: "pricing",
      published: true,
      wordCount: 450,
      h1Count: 1,
      h2Count: 3,
      h3Count: 6,
      internalLinks: 6,
      externalLinks: 0,
      totalImages: 1,
      missingAltImages: 0,
      hasSchema: true,
      schemaTypes: ["PriceSpecification", "WebPage"],
      hasBreadcrumbs: true,
      hasCta: true,
      hasFaq: true,
      localSignals: false,
      focusKeyword: "website development pricing",
    },
    {
      id: "static-audit",
      type: "page",
      path: "/audit",
      title: "Free Website & Digital Presence Audit | HD Web Studios",
      seoTitle: "Free Website & Digital Presence Audit | HD Web Studios",
      seoDescription: "Request a free comprehensive website audit. We evaluate your design, speed, mobile usability, SEO structure, and lead conversion paths.",
      slug: "audit",
      published: true,
      wordCount: 480,
      h1Count: 1,
      h2Count: 3,
      h3Count: 4,
      internalLinks: 6,
      externalLinks: 0,
      totalImages: 1,
      missingAltImages: 0,
      hasSchema: true,
      schemaTypes: ["WebPage"],
      hasBreadcrumbs: true,
      hasCta: true,
      hasFaq: false,
      localSignals: false,
      focusKeyword: "free website audit",
    },
    {
      id: "static-contact",
      type: "page",
      path: "/contact",
      title: "Contact HD Web Studios | Get a Free Website Audit in Ludhiana",
      seoTitle: "Contact HD Web Studios | Get a Free Website Audit in Ludhiana",
      seoDescription: "Get in touch with HD Web Studios in Ludhiana, Punjab. Contact us for website development, local SEO, and digital growth solutions.",
      slug: "contact",
      published: true,
      wordCount: 350,
      h1Count: 1,
      h2Count: 2,
      h3Count: 3,
      internalLinks: 5,
      externalLinks: 0,
      totalImages: 1,
      missingAltImages: 0,
      hasSchema: true,
      schemaTypes: ["ContactPage", "Organization"],
      hasBreadcrumbs: true,
      hasCta: true,
      hasFaq: false,
      localSignals: true,
      focusKeyword: "contact web developer ludhiana",
    },
    {
      id: "static-blog",
      type: "page",
      path: "/blog",
      title: "Blog & Technical Knowledge Base | HD Web Studios",
      seoTitle: "Blog & Technical Knowledge Base | HD Web Studios",
      seoDescription: "Practical guides and insights on web development, local SEO, Next.js architecture, and conversion optimization for growing businesses.",
      slug: "blog",
      published: true,
      wordCount: 420,
      h1Count: 1,
      h2Count: 3,
      h3Count: 4,
      internalLinks: 8,
      externalLinks: 0,
      totalImages: 2,
      missingAltImages: 0,
      hasSchema: true,
      schemaTypes: ["Blog", "BreadcrumbList"],
      hasBreadcrumbs: true,
      hasCta: true,
      hasFaq: false,
      localSignals: false,
      focusKeyword: "web development blog",
    },
  ];

  // Map CMS items
  const allAuditItems = [];

  // Track all internal links across site for Orphan Page Detection
  const inboundLinkCounts = new Map();
  staticPages.forEach((p) => inboundLinkCounts.set(p.path, 0));

  // Initialize inbound links map
  services.forEach((s) => inboundLinkCounts.set(`/services/${s.slug}`, 0));
  posts.forEach((p) => inboundLinkCounts.set(`/blog/${p.slug}`, 0));
  projects.forEach((pr) => inboundLinkCounts.set(`/work/${pr.slug}`, 0));

  // Count links in services and posts
  const allContentSources = [
    ...services.map((s) => s.description + " " + JSON.stringify(s.overview || {})),
    ...posts.map((p) => p.content || ""),
    ...projects.map((pr) => pr.description + " " + (pr.solution || "")),
  ];

  for (const content of allContentSources) {
    const links = extractLinks(content);
    for (const l of links) {
      if (inboundLinkCounts.has(l.href)) {
        inboundLinkCounts.set(l.href, (inboundLinkCounts.get(l.href) || 0) + 1);
      }
    }
  }

  // Audit Static Pages
  for (const page of staticPages) {
    const inbound = inboundLinkCounts.get(page.path) || 5; // header/footer links count
    allAuditItems.push(gradeAuditedPage({ ...page, inboundLinks: inbound, isStatic: true }));
  }

  // Audit Services
  for (const s of services) {
    const path = `/services/${s.slug}`;
    const rawContent = `${s.description || ""} ${s.tagline || ""} ${JSON.stringify(s.overview || {})} ${JSON.stringify(s.whatYouGet || [])}`;
    const cleanText = stripHtml(rawContent);
    const wordCount = countWords(cleanText);
    const headings = extractHeadings(s.description || "");
    const links = extractLinks(s.description || "");
    const images = extractImages(s.description || "");
    const missingAlt = images.filter((img) => !img.alt).length;

    allAuditItems.push(
      gradeAuditedPage({
        id: s._id.toString(),
        type: "service",
        path,
        title: s.title,
        seoTitle: s.seoTitle || `${s.title} | HD Web Studios`,
        seoDescription: s.seoDescription || s.shortDescription || s.description?.slice(0, 150) || "",
        slug: s.slug,
        published: Boolean(s.published),
        wordCount,
        h1Count: 1, // generated by ServiceHero
        h2Count: 6, // overview, whatYouGet, techStack, process, whyChooseUs, faq
        h3Count: (s.whatYouGet?.length || 0) + (s.faq?.length || 0),
        internalLinks: links.filter((l) => l.isInternal).length + 4, // Related services & CTA
        externalLinks: links.filter((l) => !l.isInternal).length,
        totalImages: images.length + 1,
        missingAltImages: missingAlt,
        hasSchema: true,
        schemaTypes: ["Service", "BreadcrumbList", ...(s.faq?.length ? ["FAQPage"] : [])],
        hasBreadcrumbs: true,
        hasCta: true,
        hasFaq: Boolean(s.faq?.length),
        localSignals: cleanText.toLowerCase().includes("ludhiana") || cleanText.toLowerCase().includes("punjab"),
        focusKeyword: s.focusKeyword || s.title.toLowerCase(),
        inboundLinks: inboundLinkCounts.get(path) || 0,
        updatedAt: s.updatedAt,
      })
    );
  }

  // Audit Blog Posts
  for (const p of posts) {
    const path = `/blog/${p.slug}`;
    const cleanText = stripHtml(p.content || "");
    const wordCount = countWords(cleanText);
    const headings = extractHeadings(p.content || "");
    const links = extractLinks(p.content || "");
    const images = extractImages(p.content || "");
    const missingAlt = images.filter((img) => !img.alt).length;
    const h1Count = headings.filter((h) => h.level === 1).length;
    const h2Count = headings.filter((h) => h.level === 2).length;
    const h3Count = headings.filter((h) => h.level === 3).length;

    allAuditItems.push(
      gradeAuditedPage({
        id: p._id.toString(),
        type: "blog",
        path,
        title: p.title,
        seoTitle: p.seoTitle || `${p.title} | HD Web Studios`,
        seoDescription: p.seoDescription || p.excerpt?.slice(0, 150) || "",
        slug: p.slug,
        published: p.status === "published",
        wordCount,
        h1Count: h1Count + 1, // Page header supplies H1
        h2Count,
        h3Count,
        internalLinks: links.filter((l) => l.isInternal).length,
        externalLinks: links.filter((l) => !l.isInternal).length,
        totalImages: images.length + (p.featuredImage ? 1 : 0),
        missingAltImages: missingAlt + (p.featuredImage && !p.featuredImageAlt ? 1 : 0),
        hasSchema: true,
        schemaTypes: ["BlogPosting", "BreadcrumbList"],
        hasBreadcrumbs: true,
        hasCta: true,
        hasFaq: false,
        localSignals: cleanText.toLowerCase().includes("ludhiana") || cleanText.toLowerCase().includes("punjab"),
        focusKeyword: p.focusKeyword || "",
        inboundLinks: inboundLinkCounts.get(path) || 0,
        author: p.author || "Harshdeep",
        publishedAt: p.publishedAt,
        updatedAt: p.updatedAt,
      })
    );
  }

  // Audit Projects / Work
  for (const pr of projects) {
    const path = `/work/${pr.slug}`;
    const rawContent = `${pr.description || ""} ${pr.challenge || ""} ${pr.solution || ""} ${JSON.stringify(pr.features || [])}`;
    const cleanText = stripHtml(rawContent);
    const wordCount = countWords(cleanText);
    const links = extractLinks(pr.description || "");

    allAuditItems.push(
      gradeAuditedPage({
        id: pr._id.toString(),
        type: "project",
        path,
        title: pr.title,
        seoTitle: pr.seoTitle || `${pr.title} Case Study | HD Web Studios`,
        seoDescription: pr.seoDescription || pr.shortDescription || pr.description?.slice(0, 150) || "",
        slug: pr.slug,
        published: Boolean(pr.published),
        wordCount,
        h1Count: 1,
        h2Count: 3,
        h3Count: 2,
        internalLinks: links.filter((l) => l.isInternal).length + 2,
        externalLinks: links.filter((l) => !l.isInternal).length + (pr.liveUrl ? 1 : 0),
        totalImages: (pr.gallery?.length || 0) + (pr.featuredImage ? 1 : 0),
        missingAltImages: 0,
        hasSchema: true,
        schemaTypes: ["CreativeWork", "BreadcrumbList"],
        hasBreadcrumbs: true,
        hasCta: true,
        hasFaq: false,
        localSignals: Boolean(pr.location?.toLowerCase().includes("ludhiana") || pr.location?.toLowerCase().includes("punjab")),
        focusKeyword: `${pr.title.toLowerCase()} case study`,
        inboundLinks: inboundLinkCounts.get(path) || 0,
        updatedAt: pr.updatedAt,
      })
    );
  }

  // Calculate Aggregates
  let totalCritical = 0;
  let totalHigh = 0;
  let totalMedium = 0;
  let totalLow = 0;
  const orphanPages = [];

  for (const item of allAuditItems) {
    if (item.inboundLinks === 0 && item.published && item.path !== "/") {
      orphanPages.push(item);
    }
    for (const issue of item.issues) {
      if (issue.priority === "CRITICAL") totalCritical++;
      else if (issue.priority === "HIGH") totalHigh++;
      else if (issue.priority === "MEDIUM") totalMedium++;
      else totalLow++;
    }
  }

  const averageScore =
    allAuditItems.length > 0
      ? Math.round(allAuditItems.reduce((acc, curr) => acc + curr.score, 0) / allAuditItems.length)
      : 100;

  return {
    overall: {
      score: averageScore,
      grade: averageScore >= 90 ? "Excellent" : averageScore >= 75 ? "Good" : averageScore >= 55 ? "Needs Work" : "Critical",
      totalAudited: allAuditItems.length,
      critical: totalCritical,
      high: totalHigh,
      medium: totalMedium,
      low: totalLow,
      orphanPagesCount: orphanPages.length,
    },
    items: allAuditItems,
    orphanPages,
  };
}

function gradeAuditedPage(page) {
  let score = 100;
  const issues = [];

  const title = (page.seoTitle || page.title || "").trim();
  const meta = (page.seoDescription || "").trim();
  const wordCount = page.wordCount || 0;
  const slug = page.slug ?? "";

  // 1. Title Checks
  if (!title) {
    score -= 20;
    issues.push({ priority: "CRITICAL", category: "Title", message: "Missing SEO Title tag." });
  } else if (title.length < 30) {
    score -= 5;
    issues.push({ priority: "MEDIUM", category: "Title", message: `SEO Title is too short (${title.length} chars). Aim for 45–60 chars.` });
  } else if (title.length > 65) {
    score -= 4;
    issues.push({ priority: "LOW", category: "Title", message: `SEO Title exceeds 65 chars (${title.length} chars) and may be truncated.` });
  }

  // 2. Meta Description Checks
  if (!meta) {
    score -= 15;
    issues.push({ priority: "CRITICAL", category: "Meta", message: "Missing Meta Description." });
  } else if (meta.length < 90) {
    score -= 5;
    issues.push({ priority: "MEDIUM", category: "Meta", message: `Meta description is short (${meta.length} chars). Aim for 120–155 chars.` });
  } else if (meta.length > 165) {
    score -= 3;
    issues.push({ priority: "LOW", category: "Meta", message: `Meta description exceeds 165 chars (${meta.length} chars).` });
  }

  // 3. Slug Format
  if (slug && !/^[a-z0-9-]+$/.test(slug)) {
    score -= 10;
    issues.push({ priority: "CRITICAL", category: "Slug", message: "Slug contains invalid characters. Use lowercase alphanumeric & hyphens only." });
  }

  // 4. Content Depth & Thin Content
  const minWords = page.type === "blog" ? 600 : page.type === "service" ? 300 : 200;
  if (wordCount < 50) {
    score -= 25;
    issues.push({ priority: "CRITICAL", category: "Content", message: `Extremely thin content (${wordCount} words).` });
  } else if (wordCount < minWords) {
    score -= 8;
    issues.push({ priority: "HIGH", category: "Content", message: `Content is brief (${wordCount} words). Minimum recommended is ${minWords} words.` });
  }

  // 5. Heading Structure
  if (page.h1Count > 1) {
    score -= 6;
    issues.push({ priority: "HIGH", category: "Headings", message: `Found ${page.h1Count} H1 tags. Pages must have exactly one H1.` });
  } else if (page.h1Count === 0) {
    score -= 10;
    issues.push({ priority: "CRITICAL", category: "Headings", message: "No H1 heading found on page." });
  }

  if (page.h2Count === 0 && wordCount > 200) {
    score -= 5;
    issues.push({ priority: "MEDIUM", category: "Headings", message: "No H2 subheadings to structure content." });
  }

  // 6. Internal Linking & Orphan Pages
  if (page.inboundLinks === 0 && page.published && page.path !== "/") {
    score -= 8;
    issues.push({ priority: "HIGH", category: "Links", message: "Orphan Page: No internal links point to this page." });
  }

  if (page.internalLinks === 0) {
    score -= 6;
    issues.push({ priority: "MEDIUM", category: "Links", message: "No outbound internal links in content." });
  }

  // 7. Image Alt Text
  if (page.missingAltImages > 0) {
    score -= 5;
    issues.push({ priority: "MEDIUM", category: "Images", message: `${page.missingAltImages} image(s) missing required alt text.` });
  }

  // 8. Schema Presence
  if (!page.hasSchema) {
    score -= 8;
    issues.push({ priority: "HIGH", category: "Schema", message: "Missing Schema.org structured data JSON-LD." });
  }

  // 9. CTA Presence
  if (!page.hasCta && page.type !== "page") {
    score -= 4;
    issues.push({ priority: "LOW", category: "Conversion", message: "No clear conversion CTA banner or action link." });
  }

  const finalScore = Math.max(0, Math.min(100, score));

  return {
    id: page.id,
    type: page.type,
    path: page.path,
    url: absoluteUrl(page.path),
    title: page.title,
    seoTitle: title,
    seoDescription: meta,
    slug: page.slug,
    published: page.published,
    score: finalScore,
    grade: finalScore >= 90 ? "Excellent" : finalScore >= 75 ? "Good" : finalScore >= 55 ? "Needs Work" : "Critical",
    wordCount,
    h1Count: page.h1Count,
    h2Count: page.h2Count,
    h3Count: page.h3Count,
    internalLinks: page.internalLinks,
    inboundLinks: page.inboundLinks,
    externalLinks: page.externalLinks,
    totalImages: page.totalImages,
    missingAltImages: page.missingAltImages,
    hasSchema: page.hasSchema,
    schemaTypes: page.schemaTypes || [],
    hasBreadcrumbs: page.hasBreadcrumbs,
    hasCta: page.hasCta,
    hasFaq: page.hasFaq,
    localSignals: page.localSignals,
    focusKeyword: page.focusKeyword || "",
    issues,
    updatedAt: page.updatedAt,
  };
}
