/**
 * Seed projects from data/projects.js into MongoDB.
 *
 * Usage:
 *   npm run seed:projects
 */

import mongoose from "mongoose";
import { projects } from "../data/projects.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Use: npm run seed:projects");
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    shortDescription: String,
    description: String,
    client: String,
    category: String,
    industry: String,
    location: String,
    projectType: String,
    year: String,
    challenge: String,
    solution: String,
    results: [String],
    features: [String],
    technologies: [String],
    services: [String],
    featuredImage: String,
    thumbnail: String,
    gallery: [String],
    demoUrl: String,
    liveUrl: String,
    githubUrl: String,
    caseStudyUrl: String,
    testimonial: {
      quote: String,
      author: String,
      role: String,
    },
    seoTitle: String,
    seoDescription: String,
    ogImage: String,
    published: Boolean,
    order: Number,
    featured: Boolean,
  },
  { timestamps: true }
);

const Project = mongoose.models?.Project || mongoose.model("Project", ProjectSchema);

function mapProject(project, index) {
  return {
    title: project.title,
    slug: project.slug,
    shortDescription: project.challenge || "",
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
    seoTitle: `${project.title} Case Study | HD Web Studios`,
    seoDescription: project.challenge || "",
    ogImage: "",
    published: true,
    order: project.featured ? 0 : index + 1,
    featured: Boolean(project.featured),
  };
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  let upserted = 0;

  for (let index = 0; index < projects.length; index += 1) {
    const project = projects[index];
    await Project.findOneAndUpdate(
      { slug: project.slug },
      { $set: mapProject(project, index) },
      { upsert: true, new: true, runValidators: true }
    );
    upserted += 1;
    console.log(`Upserted project: ${project.slug}`);
  }

  console.log(`Done. ${upserted} project(s) upserted.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
