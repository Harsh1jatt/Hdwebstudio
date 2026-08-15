import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, trim: true, default: "" },
    author: { type: String, trim: true, default: "" },
    role: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    shortDescription: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    client: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "" },
    industry: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    projectType: { type: String, trim: true, default: "client" },
    year: { type: String, trim: true, default: "" },
    challenge: { type: String, trim: true, default: "" },
    solution: { type: String, trim: true, default: "" },
    results: { type: [String], default: [] },
    features: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    services: { type: [String], default: [] },
    featuredImage: { type: String, trim: true, default: "" },
    thumbnail: { type: String, trim: true, default: "" },
    gallery: { type: [String], default: [] },
    demoUrl: { type: String, trim: true, default: "" },
    liveUrl: { type: String, trim: true, default: "" },
    githubUrl: { type: String, trim: true, default: "" },
    caseStudyUrl: { type: String, trim: true, default: "" },
    testimonial: { type: TestimonialSchema, default: () => ({}) },
    seoTitle: { type: String, trim: true, default: "" },
    seoDescription: { type: String, trim: true, default: "" },
    ogImage: { type: String, trim: true, default: "" },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProjectSchema.index({ published: 1, order: 1 });
ProjectSchema.index({ title: "text", slug: "text", client: "text", category: "text" });

export default mongoose.models?.Project || mongoose.model("Project", ProjectSchema);
