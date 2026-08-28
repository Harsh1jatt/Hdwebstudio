import Service from "../../models/Service.js";
import Post from "../../models/Post.js";
import Project from "../../models/Project.js";

function jaccardSimilarity(strA, strB) {
  const setA = new Set(strA.toLowerCase().split(/\s+/).filter((w) => w.length > 2));
  const setB = new Set(strB.toLowerCase().split(/\s+/).filter((w) => w.length > 2));
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  return intersection / (setA.size + setB.size - intersection);
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/**
 * Checks for keyword cannibalization, duplicate titles, and slug overlap.
 */
export async function detectCannibalization({ title, keyword, slug, excludeId = null, targetType = "service" }) {
  const targetSlug = slug || (title ? slugify(title) : "");
  const targetKeyword = (keyword || title || "").trim().toLowerCase();

  const [services, posts, projects] = await Promise.all([
    Service.find({ ...(excludeId ? { _id: { $ne: excludeId } } : {}) }).select("title slug seoTitle focusKeyword").lean(),
    Post.find({ ...(excludeId ? { _id: { $ne: excludeId } } : {}) }).select("title slug seoTitle focusKeyword").lean(),
    Project.find({ ...(excludeId ? { _id: { $ne: excludeId } } : {}) }).select("title slug seoTitle").lean(),
  ]);

  const allItems = [
    ...services.map((s) => ({ ...s, type: "service", url: `/services/${s.slug}` })),
    ...posts.map((p) => ({ ...p, type: "blog", url: `/blog/${p.slug}` })),
    ...projects.map((pr) => ({ ...pr, type: "project", url: `/portfolio/${pr.slug}` })),
  ];

  const conflicts = [];

  for (const item of allItems) {
    const itemTitle = (item.title || "").toLowerCase();
    const itemSlug = (item.slug || "").toLowerCase();
    const itemKeyword = (item.focusKeyword || itemTitle).toLowerCase();

    // 1. Exact slug match
    if (targetSlug && itemSlug === targetSlug) {
      conflicts.push({
        severity: "critical",
        type: "exact_slug_duplicate",
        existingItem: item,
        message: `An item already exists with exact URL slug: "${item.slug}" (${item.type}).`,
      });
      continue;
    }

    // 2. High title similarity (> 0.6)
    const titleSim = title ? jaccardSimilarity(title, itemTitle) : 0;
    if (titleSim >= 0.6) {
      conflicts.push({
        severity: "high",
        type: "title_similarity",
        existingItem: item,
        similarity: Math.round(titleSim * 100),
        message: `High title overlap (${Math.round(titleSim * 100)}% match) with existing ${item.type} "${item.title}".`,
      });
      continue;
    }

    // 3. Focus keyword overlap
    if (targetKeyword && itemKeyword) {
      const keywordSim = jaccardSimilarity(targetKeyword, itemKeyword);
      if (keywordSim >= 0.7) {
        conflicts.push({
          severity: "medium",
          type: "keyword_cannibalization",
          existingItem: item,
          message: `Potential keyword cannibalization: existing ${item.type} "${item.title}" already targets "${itemKeyword}".`,
        });
      }
    }
  }

  const hasConflict = conflicts.length > 0;
  const highestSeverity = conflicts.some((c) => c.severity === "critical")
    ? "critical"
    : conflicts.some((c) => c.severity === "high")
    ? "high"
    : conflicts.length > 0
    ? "medium"
    : "none";

  return {
    hasConflict,
    highestSeverity,
    conflicts,
    recommendation: hasConflict
      ? conflicts[0].type === "exact_slug_duplicate"
        ? "Update the existing page instead of creating a duplicate URL."
        : "Refine the target keyword or differentiate the subtopic to prevent search intent cannibalization."
      : "No conflict detected. Content is unique.",
  };
}
