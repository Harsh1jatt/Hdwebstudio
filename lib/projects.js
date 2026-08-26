import connectDB from "./db";
import Project from "@/models/Project";
import { siteConfig } from "@/config/site";

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
    id: doc._id.toString(),
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
    published: doc.published,
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
    return docs.map(normalizeDbProject);
  } catch (error) {
    console.error("[projects] Failed to load from DB:", error);
    return [];
  }
}

export async function getProjectBySlug(slug) {
  try {
    await connectDB();
    const doc = await Project.findOne({ slug, published: true }).lean();
    return normalizeDbProject(doc);
  } catch (error) {
    console.error(`[projects] Failed to load "${slug}":`, error);
    return null;
  }
}

export async function getAllPublishedProjectSlugs() {
  try {
    await connectDB();
    const docs = await Project.find({ published: true }).sort({ order: 1 }).select("slug").lean();
    return docs.map((doc) => doc.slug);
  } catch (error) {
    console.error("[projects] Failed to load slugs:", error);
    return [];
  }
}
