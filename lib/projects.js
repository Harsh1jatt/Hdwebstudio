import connectDB from "./db";
import Project from "@/models/Project";
import { projects as staticProjects } from "@/data/projects";
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

function normalizeStaticProject(project, index) {
  return withImageFallback({
    id: `static-${project.slug}`,
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription || project.challenge || "",
    description: project.caseStudy?.overview || "",
    client: project.title,
    category: project.category || "",
    industry: project.tag || "",
    location: "",
    projectType: project.type || "client",
    year: "",
    challenge: project.challenge || "",
    solution: (project.caseStudy?.approach || []).join("\n"),
    results: project.outcomes || [],
    features: project.caseStudy?.solution || [],
    technologies: project.technologies || [],
    services: [],
    featuredImage: project.img || "",
    thumbnail: project.img || "",
    gallery: [],
    demoUrl: "",
    liveUrl: project.link || "",
    githubUrl: "",
    caseStudyUrl: "",
    testimonial: { quote: "", author: "", role: "" },
    seoTitle: "",
    seoDescription: "",
    ogImage: "",
    published: true,
    order: project.featured ? 0 : index + 1,
    featured: Boolean(project.featured),
    legacyCaseStudy: project.caseStudy || null,
  });
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

function getStaticPublishedProjects() {
  return staticProjects.map(normalizeStaticProject);
}

async function getDbProjectCount() {
  await connectDB();
  return Project.countDocuments();
}

export async function getPublishedProjects() {
  try {
    const total = await getDbProjectCount();
    if (total > 0) {
      const docs = await Project.find({ published: true })
        .sort({ order: 1, createdAt: 1 })
        .lean();
      return docs.map(normalizeDbProject);
    }
  } catch (error) {
    console.error("[projects] Failed to load published projects from DB:", error);
  }
  return getStaticPublishedProjects();
}

export async function getProjectBySlug(slug) {
  try {
    const total = await getDbProjectCount();
    if (total > 0) {
      const doc = await Project.findOne({ slug, published: true }).lean();
      return doc ? normalizeDbProject(doc) : null;
    }
  } catch (error) {
    console.error(`[projects] Failed to load project "${slug}" from DB:`, error);
    return getStaticPublishedProjects().find((project) => project.slug === slug) || null;
  }

  return getStaticPublishedProjects().find((project) => project.slug === slug) || null;
}

export async function getAllPublishedProjectSlugs() {
  try {
    const total = await getDbProjectCount();
    if (total > 0) {
      const docs = await Project.find({ published: true }).sort({ order: 1 }).select("slug").lean();
      return docs.map((doc) => doc.slug);
    }
  } catch (error) {
    console.error("[projects] Failed to load project slugs from DB:", error);
  }

  return getStaticPublishedProjects().map((project) => project.slug);
}
