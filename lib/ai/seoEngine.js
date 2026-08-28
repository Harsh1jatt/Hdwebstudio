/**
 * Deterministic SEO Scoring & Intelligence Engine (100-Point Model)
 *
 * Transparent breakdown:
 * - Technical SEO: 20 pts
 * - Metadata: 15 pts
 * - Content Structure: 15 pts
 * - Keyword Targeting: 15 pts
 * - Internal Linking: 10 pts
 * - Semantic & Topical Coverage: 10 pts
 * - Schema Markup: 5 pts
 * - Readability & Formatting: 5 pts
 * - AI-Search Readiness: 5 pts
 * Total: 100 pts
 */

function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

function countWords(text = "") {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function extractLinks(html = "") {
  const re = /<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi;
  const links = [];
  let match;
  while ((match = re.exec(html))) {
    links.push({
      href: match[1],
      anchor: stripHtml(match[2]),
      isInternal: match[1].startsWith("/") && !match[1].startsWith("//"),
    });
  }
  return links;
}

export function evaluateSEO(doc, type = "service") {
  const issues = [];
  const suggestions = [];
  let scoreBreakdown = {
    technical: 0,
    metadata: 0,
    structure: 0,
    keywords: 0,
    internalLinks: 0,
    semanticCoverage: 0,
    schema: 0,
    readability: 0,
    aiSearchReadiness: 0,
  };

  const title = (doc.title || doc.name || "").trim();
  const seoTitle = (doc.seoTitle || title).trim();
  const seoDescription = (doc.seoDescription || doc.description || doc.shortDescription || doc.excerpt || "").trim();
  const slug = (doc.slug || "").trim();
  const content = doc.content || doc.description || "";
  const cleanContent = stripHtml(content);
  const wordCount = countWords(cleanContent);
  const headings = extractHeadings(content);
  const links = extractLinks(content);
  const internalLinks = links.filter((l) => l.isInternal);
  const focusKeyword = (doc.focusKeyword || doc.primaryKeyword || title.toLowerCase().split(" ").slice(0, 3).join(" ")).trim().toLowerCase();
  const ogImage = doc.ogImage || doc.featuredImage || doc.heroImage || "";
  const faqs = doc.faq || doc.faqs || [];

  // ─── 1. Technical SEO (Max 20) ───────────────────────────
  let technicalScore = 20;
  if (!slug) {
    technicalScore -= 8;
    issues.push({ category: "technical", severity: "critical", message: "Missing URL slug." });
  } else if (!/^[a-z0-9-]+$/.test(slug)) {
    technicalScore -= 4;
    issues.push({ category: "technical", severity: "warning", message: "Slug contains invalid characters. Use lowercase alphanumeric and hyphens." });
  } else if (slug.length > 80) {
    technicalScore -= 2;
    suggestions.push({ category: "technical", message: "Slug is overly long. Keep under 60-70 characters." });
  }

  if (slug.includes("http") || slug.includes("localhost")) {
    technicalScore -= 8;
    issues.push({ category: "technical", severity: "critical", message: "Slug contains absolute or localhost URLs." });
  }

  scoreBreakdown.technical = Math.max(0, technicalScore);

  // ─── 2. Metadata (Max 15) ────────────────────────────────
  let metaScore = 15;
  if (!seoTitle) {
    metaScore -= 7;
    issues.push({ category: "metadata", severity: "critical", message: "Missing SEO Title tag." });
  } else if (seoTitle.length < 30) {
    metaScore -= 3;
    suggestions.push({ category: "metadata", message: "SEO Title is short (< 30 chars). Aim for 45-60 characters." });
  } else if (seoTitle.length > 65) {
    metaScore -= 2;
    suggestions.push({ category: "metadata", message: "SEO Title is long (> 65 chars) and may get truncated in SERPs." });
  }

  if (!seoDescription) {
    metaScore -= 6;
    issues.push({ category: "metadata", severity: "critical", message: "Missing Meta Description." });
  } else if (seoDescription.length < 90) {
    metaScore -= 3;
    suggestions.push({ category: "metadata", message: "Meta Description is short (< 90 chars). Aim for 120-155 characters." });
  } else if (seoDescription.length > 165) {
    metaScore -= 2;
    suggestions.push({ category: "metadata", message: "Meta Description is long (> 165 chars) and may get clipped." });
  }

  if (!ogImage) {
    metaScore -= 2;
    suggestions.push({ category: "metadata", message: "Missing OpenGraph / Social Share Image." });
  }

  scoreBreakdown.metadata = Math.max(0, metaScore);

  // ─── 3. Content Structure & Hierarchy (Max 15) ────────────
  let structureScore = 15;
  const minWords = type === "blog" ? 600 : 250;
  if (wordCount < 30) {
    structureScore = 2;
    issues.push({ category: "structure", severity: "critical", message: `Extremely thin content: ${wordCount} words.` });
  } else if (wordCount < minWords) {
    const penalty = type === "blog" ? 8 : 6;
    structureScore -= penalty;
    issues.push({ category: "structure", severity: "warning", message: `Thin content: ${wordCount} words (minimum recommended is ${minWords} words).` });
  }

  const h1Count = headings.filter((h) => h.level === 1).length;
  const h2Count = headings.filter((h) => h.level === 2).length;

  if (type === "blog" && h1Count > 1) {
    structureScore -= 3;
    issues.push({ category: "structure", severity: "warning", message: "Multiple H1 tags in content body. Use only one H1 per page." });
  }

  if (type === "blog" && h2Count === 0 && wordCount > 200) {
    structureScore -= 4;
    issues.push({ category: "structure", severity: "warning", message: "No H2 subheadings found. Organize content with clear H2/H3 sections." });
  }

  scoreBreakdown.structure = Math.max(0, structureScore);

  // ─── 4. Keyword Targeting (Max 15) ───────────────────────
  let keywordScore = 15;
  if (focusKeyword) {
    const lowerContent = cleanContent.toLowerCase();
    const lowerTitle = seoTitle.toLowerCase();
    const lowerSlug = slug.toLowerCase();

    const inTitle = lowerTitle.includes(focusKeyword);
    const inSlug = lowerSlug.includes(focusKeyword.replace(/\s+/g, "-"));
    const inFirstParagraph = lowerContent.slice(0, 300).includes(focusKeyword);

    if (!inTitle) {
      keywordScore -= 4;
      suggestions.push({ category: "keywords", message: `Primary keyword "${focusKeyword}" is missing in the SEO Title.` });
    }
    if (!inSlug) {
      keywordScore -= 3;
      suggestions.push({ category: "keywords", message: `Primary keyword "${focusKeyword}" is missing in the URL slug.` });
    }
    if (!inFirstParagraph && wordCount > 100) {
      keywordScore -= 3;
      suggestions.push({ category: "keywords", message: `Primary keyword "${focusKeyword}" should appear in the opening 100 words.` });
    }

    // Keyword density check
    if (wordCount > 150) {
      const keywordRegex = new RegExp(focusKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      const matchCount = (lowerContent.match(keywordRegex) || []).length;
      const density = (matchCount * countWords(focusKeyword) / wordCount) * 100;

      if (density > 3.5) {
        keywordScore -= 5;
        issues.push({ category: "keywords", severity: "warning", message: `Keyword density is high (${density.toFixed(1)}%). Avoid keyword stuffing.` });
      } else if (matchCount === 0) {
        keywordScore -= 4;
        issues.push({ category: "keywords", severity: "warning", message: `Primary keyword "${focusKeyword}" was not found in the body text.` });
      }
    }
  } else {
    keywordScore = 4;
    suggestions.push({ category: "keywords", message: "No primary focus keyword specified for optimization." });
  }

  scoreBreakdown.keywords = Math.max(0, keywordScore);

  // ─── 5. Internal Linking (Max 10) ────────────────────────
  let internalLinkScore = 10;
  const minInternal = type === "blog" ? 3 : 1;
  if (internalLinks.length === 0) {
    internalLinkScore = 2;
    suggestions.push({ category: "internalLinks", message: `Missing internal links. Add links to relevant services or contact pages.` });
  } else if (internalLinks.length < minInternal) {
    internalLinkScore -= (minInternal - internalLinks.length) * 3;
    suggestions.push({ category: "internalLinks", message: `Contains ${internalLinks.length} internal link(s). Add at least ${minInternal} relevant links.` });
  }

  scoreBreakdown.internalLinks = Math.max(0, internalLinkScore);

  // ─── 6. Semantic & Topical Coverage (Max 10) ─────────────
  let semanticScore = 10;
  if (wordCount < 50) {
    semanticScore = 2;
  } else {
    if (faqs.length === 0 && (type === "service" || type === "blog")) {
      semanticScore -= 4;
      suggestions.push({ category: "semantic", message: "No FAQ section included. Adding 3-5 FAQs improves search intent coverage." });
    }

    if (type === "service" && (!doc.whatYouGet || doc.whatYouGet.length < 3)) {
      semanticScore -= 3;
      suggestions.push({ category: "semantic", message: "Include deliverables/features (What You Get) to strengthen commercial intent." });
    }
  }

  scoreBreakdown.semanticCoverage = Math.max(0, semanticScore);

  // ─── 7. Schema Markup Readiness (Max 5) ──────────────────
  let schemaScore = 5;
  if (wordCount < 50 || !doc.title || !doc.description) {
    schemaScore = 1;
  }
  scoreBreakdown.schema = Math.max(0, schemaScore);

  // ─── 8. Readability & Formatting (Max 5) ─────────────────
  let readabilityScore = 5;
  if (wordCount < 30) {
    readabilityScore = 1;
  } else {
    const hasLists = content.includes("<ul") || content.includes("<ol") || content.includes("- ") || content.includes("1. ");
    const hasFormatting = content.includes("<strong") || content.includes("**");
    if (!hasLists && wordCount > 250) {
      readabilityScore -= 2;
      suggestions.push({ category: "readability", message: "Use bulleted lists to break up long text blocks." });
    }
    if (!hasFormatting && wordCount > 200) {
      readabilityScore -= 1;
    }
  }
  scoreBreakdown.readability = Math.max(0, readabilityScore);

  // ─── 9. AI-Search & Entity Readiness (Max 5) ─────────────
  let aiSearchScore = 5;
  if (wordCount < 50) {
    aiSearchScore = 1;
  } else {
    const hasDirectAnswer = cleanContent.length > 100 && (seoDescription.length >= 100 || cleanContent.includes("is a") || cleanContent.includes("helps"));
    if (!hasDirectAnswer) {
      aiSearchScore -= 2;
      suggestions.push({ category: "aiSearch", message: "Include a direct, factual 2-sentence summary answering the user's primary query." });
    }
    if (faqs.length >= 2) {
      aiSearchScore = Math.min(5, aiSearchScore + 1);
    }
  }
  scoreBreakdown.aiSearchReadiness = Math.max(0, aiSearchScore);

  // ─── Total Score Calculation ─────────────────────────────
  const totalScore = Object.values(scoreBreakdown).reduce((a, b) => a + b, 0);

  return {
    score: Math.min(100, Math.max(0, Math.round(totalScore))),
    grade: totalScore >= 90 ? "Excellent" : totalScore >= 75 ? "Good" : totalScore >= 55 ? "Needs Work" : "Critical",
    breakdown: scoreBreakdown,
    metrics: {
      wordCount,
      headingCount: headings.length,
      internalLinksCount: internalLinks.length,
      faqCount: faqs.length,
      focusKeyword,
      density: focusKeyword && wordCount > 0 ? `${(((cleanContent.toLowerCase().match(new RegExp(focusKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length * countWords(focusKeyword)) / wordCount * 100).toFixed(1)}%` : "0%",
    },
    issues,
    suggestions,
  };
}
