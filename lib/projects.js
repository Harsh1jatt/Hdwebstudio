import connectDB from "./db";
import Project from "@/models/Project";
import { siteConfig } from "@/config/site";
import { projects as staticProjects, getProject as getStaticProject, getAllProjectSlugs as getStaticProjectSlugs } from "./projects-data";

function withImageFallback(project) {
  if (!project) return null;
  return {
    ...project,
    featuredImage:
      project.featuredImage || project.thumbnail || siteConfig.assets.projectPlaceholder,
    thumbnail:
      project.thumbnail || project.featuredImage || siteConfig.assets.projectPlaceholder,
    gallery: Array.isArray(project.gallery) ? project.gallery : [],
  };
}

function normalizeDbProject(doc) {
  if (!doc) return null;
  return withImageFallback({
    id: doc._id?.toString() || doc.slug,
    title: doc.title,
    slug: doc.slug,
    shortDescription: doc.shortDescription || "",
    description: doc.description || "",
    client: doc.client || "",
    category: doc.category || "",
    industry: doc.industry || "",
    location: doc.location || "",
    projectType: doc.projectType || "client",
    year: doc.year || "",
    challenge: doc.challenge || "",
    solution: doc.solution || "",
    results: doc.results || [],
    features: doc.features || [],
    technologies: doc.technologies || [],
    services: doc.services || [],
    featuredImage: doc.featuredImage || "",
    thumbnail: doc.thumbnail || "",
    gallery: doc.gallery || [],
    demoUrl: doc.demoUrl || "",
    liveUrl: doc.liveUrl || "",
    githubUrl: doc.githubUrl || "",
    caseStudyUrl: doc.caseStudyUrl || "",
    testimonial: doc.testimonial || { quote: "", author: "", role: "" },
    seoTitle: doc.seoTitle || "",
    seoDescription: doc.seoDescription || "",
    ogImage: doc.ogImage || "",
    published: doc.published ?? true,
    order: doc.order ?? 0,
    featured: Boolean(doc.featured),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
}

export async function getPublishedProjects() {
  try {
    await connectDB();
    const docs = await Project.find({ published: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    if (docs && docs.length > 0) {
      return docs.map(normalizeDbProject);
    }
    return staticProjects.map(normalizeDbProject);
  } catch (error) {
    console.error("[projects] Failed to load from DB, using fallback:", error);
    return staticProjects.map(normalizeDbProject);
  }
}

export async function getProjectBySlug(slug) {
  try {
    await connectDB();
    const doc = await Project.findOne({ slug, published: true }).lean();
    if (doc) return normalizeDbProject(doc);
    const fallback = getStaticProject(slug);
    return fallback ? normalizeDbProject(fallback) : null;
  } catch (error) {
    console.error(`[projects] Failed to load "${slug}" from DB, using fallback:`, error);
    const fallback = getStaticProject(slug);
    return fallback ? normalizeDbProject(fallback) : null;
  }
}

export async function getAllPublishedProjectSlugs() {
  try {
    await connectDB();
    const docs = await Project.find({ published: true }).sort({ order: 1 }).select("slug").lean();
    if (docs && docs.length > 0) {
      return docs.map((doc) => doc.slug);
    }
    return getStaticProjectSlugs();
  } catch (error) {
    console.error("[projects] Failed to load slugs, using fallback:", error);
    return getStaticProjectSlugs();
  }
}

export async function getPublishedProjectsCount() {
  try {
    await connectDB();
    const count = await Project.countDocuments({ published: true });
    return count > 0 ? count : staticProjects.length;
  } catch {
    return staticProjects.length;
  }
}
