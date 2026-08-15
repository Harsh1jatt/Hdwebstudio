import connectDB from "./db";
import Testimonial from "../models/Testimonial";
import { testimonials as staticTestimonials } from "../data/testimonials";

function normalizeDbTestimonial(doc) {
  if (!doc) return null;
  return {
    name: doc.name,
    role: doc.role || "",
    company: doc.company || "",
    content: doc.content,
    rating: doc.rating ?? 5,
    image: doc.image || "",
    imageAlt: doc.imageAlt || "",
    location: doc.location || "",
    featured: doc.featured,
    published: doc.published,
    order: doc.order ?? 0,
  };
}

function getStaticPublishedTestimonials() {
  return staticTestimonials.map((t) => ({
    name: t.name,
    role: t.role || "",
    company: "",
    content: t.quote,
    rating: 5,
    image: "",
    imageAlt: "",
    location: t.location || "",
    featured: false,
    published: true,
    order: 0,
  }));
}

export async function getPublishedTestimonials() {
  try {
    await connectDB();
    const totalCount = await Testimonial.countDocuments();
    if (totalCount > 0) {
      const docs = await Testimonial.find({ published: true })
        .sort({ order: 1, createdAt: 1 })
        .lean();
      return docs.map(normalizeDbTestimonial);
    }
  } catch (error) {
    console.error("[testimonials] Failed to load from DB:", error);
  }
  return getStaticPublishedTestimonials();
}
