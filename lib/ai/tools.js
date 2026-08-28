/**
 * HD Web Studios — AI Agency Operating System Tool Registry
 *
 * Secure server-side tool execution with:
 * - Allowlisted database operations
 * - Complete input validation
 * - Deterministic SEO scoring
 * - Keyword cannibalization checks
 * - Internal linking engine
 * - Cache revalidation
 * - Audit logging
 */

import Service from "../../models/Service.js";
import Post from "../../models/Post.js";
import Project from "../../models/Project.js";
import FAQ from "../../models/FAQ.js";
import Testimonial from "../../models/Testimonial.js";
import Contact from "../../models/Contact.js";
import SiteSettings from "../../models/SiteSettings.js";
import AiActionLog from "../../models/AiActionLog.js";
import { evaluateSEO } from "./seoEngine.js";
import { detectCannibalization } from "./cannibalization.js";
import { findInternalLinkRecommendations } from "./internalLinks.js";
import { getContentClusters } from "./contentClusters.js";
import { getBrandContext } from "./brandContext.js";
import { analyzeLead } from "./leadIntelligence.js";
import { auditWebsite } from "./websiteAudit.js";
import { revalidateContent } from "../revalidation.js";

// ─── Helpers ────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/-$/, "");
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function makeResult(success, data = {}) {
  return { success, ...data };
}

async function recordAction(params) {
  try {
    await AiActionLog.create({
      adminId: params.adminId || "admin",
      adminName: params.adminName || "Admin",
      prompt: params.prompt || params.action || "Tool execution",
      action: params.action || "tool_call",
      tool: params.tool || "system",
      entityType: params.entityType || "system",
      entityId: params.entityId || "",
      entitySlug: params.entitySlug || "",
      status: params.status || "completed",
      summary: params.summary || "",
      details: params.details || {},
      error: params.error || "",
    });
  } catch (err) {
    console.warn("[ToolRegistry] Non-critical audit log notice:", err.message);
  }
}

// ─── Content Tools: Services ────────────────────────────

async function createService(params, context = {}) {
  const { title, tagline, description, shortDescription, category, whatYouGet, faq, seoTitle, seoDescription, focusKeyword, publish = false } = params;

  if (!title || !tagline || !description) {
    return makeResult(false, { error: "validation_error", message: "Title, tagline, and description are required." });
  }

  const slug = params.slug || slugify(title);

  // Cannibalization check
  const conflictCheck = await detectCannibalization({ title, slug, keyword: focusKeyword || title, targetType: "service" });
  if (conflictCheck.hasConflict && conflictCheck.highestSeverity === "critical") {
    return makeResult(false, {
      error: "duplicate_conflict",
      message: conflictCheck.recommendation,
      conflicts: conflictCheck.conflicts,
    });
  }

  const doc = await Service.create({
    slug,
    title: capitalizeWords(title),
    eyebrow: capitalizeWords(title),
    tagline,
    description,
    shortDescription: shortDescription || description.slice(0, 150),
    overview: { heading: `About Our ${title}`, paragraphs: [description], highlights: [] },
    category: category || "Web Development",
    whatYouGet: whatYouGet || [],
    faq: faq || [],
    seoTitle: seoTitle || `${title} | HD Web Studios`,
    seoDescription: seoDescription || description.slice(0, 155),
    published: Boolean(publish),
  });

  const seo = evaluateSEO(doc, "service");
  revalidateContent({ type: "service", slug: doc.slug });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "create_service",
    tool: "create_service",
    entityType: "service",
    entityId: doc._id.toString(),
    entitySlug: doc.slug,
    summary: `Created service "${doc.title}" (Status: ${doc.published ? "Published" : "Draft"}, SEO: ${seo.score}/100)`,
  });

  return makeResult(true, {
    message: `Created service "${doc.title}" as ${doc.published ? "Published" : "Draft"}.`,
    id: doc._id.toString(),
    slug: doc.slug,
    seoScore: seo.score,
    seoGrade: seo.grade,
    published: doc.published,
    editUrl: `/admin/services/${doc._id}`,
    publicUrl: `/services/${doc.slug}`,
  });
}

async function updateService(params, context = {}) {
  const { id, slug, name, fields } = params;
  if (!fields || Object.keys(fields).length === 0) {
    return makeResult(false, { error: "no_fields", message: "No fields specified to update." });
  }

  let doc;
  if (id) doc = await Service.findById(id);
  else if (slug) doc = await Service.findOne({ slug });
  else if (name) doc = await Service.findOne({ title: new RegExp(name, "i") });

  if (!doc) return makeResult(false, { error: "not_found", message: "Service not found." });

  Object.assign(doc, fields);
  await doc.save();

  revalidateContent({ type: "service", slug: doc.slug });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "update_service",
    tool: "update_service",
    entityType: "service",
    entityId: doc._id.toString(),
    entitySlug: doc.slug,
    summary: `Updated service "${doc.title}". Fields: ${Object.keys(fields).join(", ")}`,
  });

  return makeResult(true, {
    message: `Updated service "${doc.title}".`,
    id: doc._id.toString(),
    slug: doc.slug,
    editUrl: `/admin/services/${doc._id}`,
  });
}

async function deleteService(params, context = {}) {
  const { id, slug, name } = params;
  let doc;
  if (id) doc = await Service.findById(id);
  else if (slug) doc = await Service.findOne({ slug });
  else if (name) doc = await Service.findOne({ title: new RegExp(name, "i") });

  if (!doc) return makeResult(false, { error: "not_found", message: "Service not found." });

  const title = doc.title;
  const deletedSlug = doc.slug;
  await Service.findByIdAndDelete(doc._id);

  revalidateContent({ type: "service", slug: deletedSlug });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "delete_service",
    tool: "delete_service",
    entityType: "service",
    entityId: doc._id.toString(),
    entitySlug: deletedSlug,
    summary: `Deleted service "${title}"`,
  });

  return makeResult(true, { message: `Deleted service "${title}".` });
}

async function searchServices(params) {
  const { query = "", category = "", published, limit = 20 } = params;
  const filter = {};
  if (published !== undefined) filter.published = Boolean(published);
  if (category) filter.category = category;
  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ title: new RegExp(escaped, "i") }, { tagline: new RegExp(escaped, "i") }, { description: new RegExp(escaped, "i") }];
  }

  const items = await Service.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
  return makeResult(true, {
    count: items.length,
    services: items.map((s) => ({
      id: s._id.toString(),
      title: s.title,
      slug: s.slug,
      category: s.category,
      published: s.published,
      tagline: s.tagline,
      editUrl: `/admin/services/${s._id}`,
      publicUrl: `/services/${s.slug}`,
    })),
  });
}

// ─── Content Tools: Blogs ───────────────────────────────

async function createBlog(params, context = {}) {
  const { title, excerpt, content, category, tags, seoTitle, seoDescription, focusKeyword, publish = false } = params;

  if (!title) return makeResult(false, { error: "validation_error", message: "Blog title is required." });

  const slug = params.slug || slugify(title);

  // Cannibalization check
  const conflictCheck = await detectCannibalization({ title, slug, keyword: focusKeyword || title, targetType: "blog" });
  if (conflictCheck.hasConflict && conflictCheck.highestSeverity === "critical") {
    return makeResult(false, {
      error: "duplicate_conflict",
      message: conflictCheck.recommendation,
      conflicts: conflictCheck.conflicts,
    });
  }

  const wordCount = (content || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const doc = await Post.create({
    title: capitalizeWords(title),
    slug,
    excerpt: excerpt || "",
    content: content || "",
    contentFormat: "html",
    category: category || "Web Development",
    tags: tags || [],
    seoTitle: seoTitle || `${title} | HD Web Studios`,
    seoDescription: seoDescription || (excerpt || "").slice(0, 155),
    focusKeyword: focusKeyword || "",
    author: "Harshdeep",
    status: publish ? "published" : "draft",
    publishedAt: publish ? new Date() : null,
    readingTime,
  });

  const seo = evaluateSEO(doc, "blog");
  revalidateContent({ type: "blog", slug: doc.slug });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "create_blog",
    tool: "create_blog",
    entityType: "blog",
    entityId: doc._id.toString(),
    entitySlug: doc.slug,
    summary: `Created blog article "${doc.title}" (Status: ${doc.status}, SEO: ${seo.score}/100)`,
  });

  return makeResult(true, {
    message: `Created blog "${doc.title}" as ${doc.status}.`,
    id: doc._id.toString(),
    slug: doc.slug,
    seoScore: seo.score,
    seoGrade: seo.grade,
    status: doc.status,
    editUrl: `/admin/blog/${doc._id}`,
    publicUrl: `/blog/${doc.slug}`,
  });
}

async function updateBlog(params, context = {}) {
  const { id, slug, name, fields } = params;
  if (!fields || Object.keys(fields).length === 0) {
    return makeResult(false, { error: "no_fields", message: "No fields specified to update." });
  }

  let doc;
  if (id) doc = await Post.findById(id);
  else if (slug) doc = await Post.findOne({ slug });
  else if (name) doc = await Post.findOne({ title: new RegExp(name, "i") });

  if (!doc) return makeResult(false, { error: "not_found", message: "Blog post not found." });

  if (fields.content) {
    const wordCount = fields.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
    fields.readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  if (fields.status === "published" && doc.status !== "published") {
    fields.publishedAt = new Date();
  }

  Object.assign(doc, fields);
  await doc.save();

  revalidateContent({ type: "blog", slug: doc.slug });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "update_blog",
    tool: "update_blog",
    entityType: "blog",
    entityId: doc._id.toString(),
    entitySlug: doc.slug,
    summary: `Updated blog "${doc.title}". Fields: ${Object.keys(fields).join(", ")}`,
  });

  return makeResult(true, {
    message: `Updated blog "${doc.title}".`,
    id: doc._id.toString(),
    slug: doc.slug,
    editUrl: `/admin/blog/${doc._id}`,
  });
}

async function deleteBlog(params, context = {}) {
  const { id, slug, name } = params;
  let doc;
  if (id) doc = await Post.findById(id);
  else if (slug) doc = await Post.findOne({ slug });
  else if (name) doc = await Post.findOne({ title: new RegExp(name, "i") });

  if (!doc) return makeResult(false, { error: "not_found", message: "Blog post not found." });

  const title = doc.title;
  const deletedSlug = doc.slug;
  await Post.findByIdAndDelete(doc._id);

  revalidateContent({ type: "blog", slug: deletedSlug });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "delete_blog",
    tool: "delete_blog",
    entityType: "blog",
    entityId: doc._id.toString(),
    entitySlug: deletedSlug,
    summary: `Deleted blog "${title}"`,
  });

  return makeResult(true, { message: `Deleted blog "${title}".` });
}

async function searchBlogs(params) {
  const { query = "", status, category, limit = 20 } = params;
  const filter = {};
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ title: new RegExp(escaped, "i") }, { excerpt: new RegExp(escaped, "i") }, { content: new RegExp(escaped, "i") }];
  }

  const items = await Post.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
  return makeResult(true, {
    count: items.length,
    blogs: items.map((b) => ({
      id: b._id.toString(),
      title: b.title,
      slug: b.slug,
      status: b.status,
      category: b.category,
      readingTime: b.readingTime,
      editUrl: `/admin/blog/${b._id}`,
      publicUrl: `/blog/${b.slug}`,
    })),
  });
}

// ─── Content Tools: Projects ────────────────────────────

async function createProject(params, context = {}) {
  const { title, description, shortDescription, client, category, technologies, publish = false } = params;
  if (!title) return makeResult(false, { error: "validation_error", message: "Project title is required." });

  const slug = params.slug || slugify(title);

  const doc = await Project.create({
    title: capitalizeWords(title),
    slug,
    shortDescription: shortDescription || "",
    description: description || "",
    client: client || "",
    category: category || "Web Development",
    technologies: technologies || ["Next.js", "Tailwind CSS", "MongoDB"],
    published: Boolean(publish),
  });

  revalidateContent({ type: "project", slug: doc.slug });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "create_project",
    tool: "create_project",
    entityType: "project",
    entityId: doc._id.toString(),
    entitySlug: doc.slug,
    summary: `Created portfolio project "${doc.title}"`,
  });

  return makeResult(true, {
    message: `Created project "${doc.title}" as ${doc.published ? "Published" : "Draft"}.`,
    id: doc._id.toString(),
    slug: doc.slug,
    editUrl: `/admin/projects/${doc._id}`,
    publicUrl: `/portfolio/${doc.slug}`,
  });
}

async function searchProjects(params) {
  const { query = "", limit = 20 } = params;
  const filter = {};
  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ title: new RegExp(escaped, "i") }, { description: new RegExp(escaped, "i") }, { client: new RegExp(escaped, "i") }];
  }

  const items = await Project.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
  return makeResult(true, {
    count: items.length,
    projects: items.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      client: p.client,
      published: p.published,
      editUrl: `/admin/projects/${p._id}`,
      publicUrl: `/portfolio/${p.slug}`,
    })),
  });
}

// ─── Content Tools: FAQs & Testimonials ─────────────────

async function createFAQ(params, context = {}) {
  const { question, answer, category = "General", publish = true } = params;
  if (!question || !answer) return makeResult(false, { error: "validation_error", message: "Question and answer are required." });

  const doc = await FAQ.create({ question, answer, category, published: Boolean(publish) });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "create_faq",
    tool: "create_faq",
    entityType: "faq",
    entityId: doc._id.toString(),
    summary: `Created FAQ: "${doc.question.slice(0, 40)}..."`,
  });

  return makeResult(true, { message: `Created FAQ.`, id: doc._id.toString(), editUrl: `/admin/faqs/${doc._id}` });
}

async function createTestimonial(params, context = {}) {
  const { name, content, company, role, rating = 5, publish = true } = params;
  if (!name || !content) return makeResult(false, { error: "validation_error", message: "Name and content are required." });

  const doc = await Testimonial.create({ name, content, company: company || "", role: role || "", rating, published: Boolean(publish) });

  await recordAction({
    adminId: context.adminId,
    adminName: context.adminName,
    prompt: context.prompt,
    action: "create_testimonial",
    tool: "create_testimonial",
    entityType: "testimonial",
    entityId: doc._id.toString(),
    summary: `Created testimonial from "${doc.name}"`,
  });

  return makeResult(true, { message: `Created testimonial from "${doc.name}".`, id: doc._id.toString(), editUrl: `/admin/testimonials/${doc._id}` });
}

// ─── SEO & Intelligence Tools ───────────────────────────

async function toolAnalyzeSEO(params) {
  const { doc, type = "service", id, slug } = params;
  let targetDoc = doc;

  if (!targetDoc) {
    if (type === "service") targetDoc = id ? await Service.findById(id).lean() : await Service.findOne({ slug }).lean();
    else if (type === "blog") targetDoc = id ? await Post.findById(id).lean() : await Post.findOne({ slug }).lean();
    else if (type === "project") targetDoc = id ? await Project.findById(id).lean() : await Project.findOne({ slug }).lean();
  }

  if (!targetDoc) return makeResult(false, { error: "not_found", message: "Document not found to analyze." });

  const analysis = evaluateSEO(targetDoc, type);
  return makeResult(true, { analysis });
}

async function toolDetectCannibalization(params) {
  const { title, keyword, slug, targetType = "service" } = params;
  const report = await detectCannibalization({ title, keyword, slug, targetType });
  return makeResult(true, report);
}

async function toolFindInternalLinks(params) {
  const { content, currentSlug = "" } = params;
  const links = await findInternalLinkRecommendations({ content, currentSlug });
  return makeResult(true, links);
}

async function toolGetContentClusters() {
  const clusters = await getContentClusters();
  return makeResult(true, clusters);
}

async function toolAuditWebsite(params) {
  const { url } = params;
  const report = await auditWebsite(url);
  return report;
}

async function toolAnalyzeLead(params) {
  const { leadId, lead } = params;
  let targetLead = lead;
  if (!targetLead && leadId) targetLead = await Contact.findById(leadId).lean();
  if (!targetLead) return makeResult(false, { error: "not_found", message: "Lead not found." });

  const intelligence = analyzeLead(targetLead);
  return makeResult(true, { intelligence });
}

// ─── Context & Summary Tools ────────────────────────────

async function toolGetBrandContext() {
  const brand = await getBrandContext();
  return makeResult(true, { brand });
}

async function toolAuditContentSummary() {
  const [serviceCount, blogPublished, blogDrafts, projectCount, faqCount, testimonialCount, leadCount] = await Promise.all([
    Service.countDocuments(),
    Post.countDocuments({ status: "published" }),
    Post.countDocuments({ status: "draft" }),
    Project.countDocuments(),
    FAQ.countDocuments(),
    Testimonial.countDocuments(),
    Contact.countDocuments(),
  ]);

  return makeResult(true, {
    summary: {
      services: serviceCount,
      publishedBlogs: blogPublished,
      draftBlogs: blogDrafts,
      projects: projectCount,
      faqs: faqCount,
      testimonials: testimonialCount,
      leads: leadCount,
    },
  });
}

// ─── Tool Registry Map ──────────────────────────────────

export const TOOLS = {
  // Service Tools
  create_service: { name: "create_service", description: "Create a new agency service with full SEO and schema.", execute: createService },
  update_service: { name: "update_service", description: "Update existing service fields.", execute: updateService },
  delete_service: { name: "delete_service", description: "Delete a service permanently.", execute: deleteService, destructive: true },
  search_services: { name: "search_services", description: "Search existing services by query or category.", execute: searchServices },

  // Blog Tools
  create_blog: { name: "create_blog", description: "Create a new blog article.", execute: createBlog },
  update_blog: { name: "update_blog", description: "Update blog fields or publish status.", execute: updateBlog },
  delete_blog: { name: "delete_blog", description: "Delete a blog post permanently.", execute: deleteBlog, destructive: true },
  search_blogs: { name: "search_blogs", description: "Search blogs by keyword, category, or status.", execute: searchBlogs },

  // Project Tools
  create_project: { name: "create_project", description: "Create a new case study portfolio item.", execute: createProject },
  search_projects: { name: "search_projects", description: "Search portfolio projects.", execute: searchProjects },

  // FAQ & Testimonials
  create_faq: { name: "create_faq", description: "Create an FAQ question/answer pair.", execute: createFAQ },
  create_testimonial: { name: "create_testimonial", description: "Add a client testimonial.", execute: createTestimonial },

  // SEO & Intelligence Tools
  analyze_seo: { name: "analyze_seo", description: "Run 100-point deterministic SEO analysis on content.", execute: toolAnalyzeSEO },
  detect_cannibalization: { name: "detect_cannibalization", description: "Check for duplicate titles, slugs, and keyword cannibalization.", execute: toolDetectCannibalization },
  find_internal_links: { name: "find_internal_links", description: "Find internal linking recommendations for text.", execute: toolFindInternalLinks },
  get_content_clusters: { name: "get_content_clusters", description: "Get topical content clusters graph.", execute: toolGetContentClusters },
  audit_website_url: { name: "audit_website_url", description: "Perform safe SSRF-protected digital presence audit on a URL.", execute: toolAuditWebsite },
  analyze_lead: { name: "analyze_lead", description: "Generate AI lead intelligence and follow-up strategy.", execute: toolAnalyzeLead },

  // Context Tools
  get_brand_context: { name: "get_brand_context", description: "Get HD Web Studios brand voice, positioning, and rules.", execute: toolGetBrandContext },
  audit_content_summary: { name: "audit_content_summary", description: "Get total content inventory and missing areas.", execute: toolAuditContentSummary },
};

export function getTool(name) {
  return TOOLS[name] || null;
}

export function listTools() {
  return Object.values(TOOLS).map((t) => ({ name: t.name, description: t.description, destructive: Boolean(t.destructive) }));
}
