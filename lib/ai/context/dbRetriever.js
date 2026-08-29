/**
 * HD Web Studios — Selective Database Context Retriever
 *
 * Provides targeted context builders for AI generators without dumping the full database.
 */

import mongoose from "mongoose";
import Service from "../../../models/Service.js";
import Post from "../../../models/Post.js";
import Project from "../../../models/Project.js";
import FAQ from "../../../models/FAQ.js";
import Testimonial from "../../../models/Testimonial.js";

function isDbReady() {
  return Boolean(mongoose.connection && mongoose.connection.readyState === 1);
}

/**
 * Retrieve top relevant published services.
 */
export async function getRelevantServices({ category, limit = 6, excludeSlug = "", query = "" } = {}) {
  if (!isDbReady()) return [];
  try {
    const filter = { published: true };
    if (excludeSlug) filter.slug = { $ne: excludeSlug };
    if (category) filter.category = category;
    if (query) {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [{ title: new RegExp(escaped, "i") }, { category: new RegExp(escaped, "i") }];
    }

    const items = await Service.find(filter)
      .select("title slug category tagline shortDescription whatYouGet.title")
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();

    return items.map((s) => ({
      title: s.title,
      slug: s.slug,
      url: `/services/${s.slug}`,
      category: s.category || "Web Development",
      tagline: s.tagline || "",
      summary: s.shortDescription || "",
      features: (s.whatYouGet || []).map((w) => w.title).filter(Boolean),
    }));
  } catch (err) {
    console.warn("[dbRetriever] getRelevantServices error:", err.message);
    return [];
  }
}

/**
 * Retrieve top relevant published blog posts.
 */
export async function getRelevantBlogs({ category, limit = 6, excludeSlug = "", query = "" } = {}) {
  if (!isDbReady()) return [];
  try {
    const filter = { status: "published" };
    if (excludeSlug) filter.slug = { $ne: excludeSlug };
    if (category) filter.category = category;
    if (query) {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [{ title: new RegExp(escaped, "i") }, { focusKeyword: new RegExp(escaped, "i") }];
    }

    const items = await Post.find(filter)
      .select("title slug category excerpt focusKeyword readingTime")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return items.map((p) => ({
      title: p.title,
      slug: p.slug,
      url: `/blog/${p.slug}`,
      category: p.category,
      excerpt: p.excerpt || "",
      focusKeyword: p.focusKeyword || "",
    }));
  } catch (err) {
    console.warn("[dbRetriever] getRelevantBlogs error:", err.message);
    return [];
  }
}

/**
 * Retrieve top relevant portfolio case studies / projects.
 */
export async function getRelevantProjects({ category, limit = 5, excludeSlug = "" } = {}) {
  if (!isDbReady()) return [];
  try {
    const filter = { published: true };
    if (excludeSlug) filter.slug = { $ne: excludeSlug };
    if (category) filter.category = category;

    const items = await Project.find(filter)
      .select("title slug client category industry technologies shortDescription results")
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();

    return items.map((pr) => ({
      title: pr.title,
      slug: pr.slug,
      url: `/work/${pr.slug}`,
      client: pr.client || "",
      category: pr.category || "",
      industry: pr.industry || "",
      technologies: pr.technologies || [],
      results: pr.results || [],
    }));
  } catch (err) {
    console.warn("[dbRetriever] getRelevantProjects error:", err.message);
    return [];
  }
}

/**
 * Retrieve relevant FAQs by category.
 */
export async function getRelevantFAQs({ category, limit = 8 } = {}) {
  if (!isDbReady()) return [];
  try {
    const filter = { published: true };
    if (category) filter.category = category;

    const items = await FAQ.find(filter)
      .select("question answer category")
      .sort({ order: 1 })
      .limit(limit)
      .lean();

    return items.map((f) => ({
      q: f.question,
      a: f.answer,
      category: f.category,
    }));
  } catch (err) {
    console.warn("[dbRetriever] getRelevantFAQs error:", err.message);
    return [];
  }
}

/**
 * Retrieve a compact index of all published website pages for internal link suggestions.
 */
export async function getPublishedPagesIndex() {
  const corePages = [
    { title: "Home", url: "/", anchorHints: ["web development agency", "HD Web Studios", "website design company"] },
    { title: "About Us", url: "/about", anchorHints: ["about HD Web Studios", "our team", "Ludhiana agency"] },
    { title: "Selected Work & Case Studies", url: "/work", anchorHints: ["portfolio", "case studies", "our past work"] },
    { title: "Services Overview", url: "/services", anchorHints: ["our services", "web solutions", "digital growth"] },
    { title: "Contact & Discovery", url: "/contact", anchorHints: ["contact our team", "get in touch", "request a quote", "schedule a consultation"] },
    { title: "Free Digital Audit", url: "/audit", anchorHints: ["free website audit", "audit your website", "performance test"] },
    { title: "Pricing & Packages", url: "/pricing", anchorHints: ["website development pricing", "transparent packages", "web design cost"] },
  ];

  if (!isDbReady()) return corePages;

  try {
    const [services, posts, projects] = await Promise.all([
      Service.find({ published: true }).select("title slug category").lean(),
      Post.find({ status: "published" }).select("title slug focusKeyword category").lean(),
      Project.find({ published: true }).select("title slug category client").lean(),
    ]);

    const servicePages = services.map((s) => ({
      title: s.title,
      url: `/services/${s.slug}`,
      anchorHints: [s.title.toLowerCase(), s.slug.replace(/-/g, " "), `${s.title.toLowerCase()} in Ludhiana`],
    }));

    const blogPages = posts.map((p) => ({
      title: p.title,
      url: `/blog/${p.slug}`,
      anchorHints: [p.title.toLowerCase(), p.focusKeyword?.toLowerCase() || p.slug.replace(/-/g, " ")],
    }));

    const projectPages = projects.map((pr) => ({
      title: pr.title,
      url: `/work/${pr.slug}`,
      anchorHints: [`${pr.title.toLowerCase()} case study`, pr.client ? `${pr.client.toLowerCase()} website` : pr.title.toLowerCase()],
    }));

    return [...corePages, ...servicePages, ...projectPages, ...blogPages];
  } catch (err) {
    console.warn("[dbRetriever] getPublishedPagesIndex error:", err.message);
    return corePages;
  }
}
