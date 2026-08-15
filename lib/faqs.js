import connectDB from "./db";
import FAQ from "../models/FAQ";
import { homepageFaqs } from "../data/faqs";

function normalizeDbFaq(doc) {
  if (!doc) return null;
  return {
    question: doc.question,
    answer: doc.answer,
    category: doc.category || "General",
    published: doc.published,
    order: doc.order ?? 0,
    featured: doc.featured,
  };
}

function getStaticPublishedFaqs() {
  return homepageFaqs.map((f) => ({
    question: f.q,
    answer: f.a,
    category: "General",
    published: true,
    order: 0,
    featured: false,
  }));
}

export async function getPublishedFaqs() {
  try {
    await connectDB();
    const totalCount = await FAQ.countDocuments();
    if (totalCount > 0) {
      const docs = await FAQ.find({ published: true }).sort({ order: 1, createdAt: 1 }).lean();
      return docs.map(normalizeDbFaq);
    }
  } catch (error) {
    console.error("[faqs] Failed to load from DB:", error);
  }
  return getStaticPublishedFaqs();
}

export async function getPublishedFaqsByCategory(category) {
  try {
    await connectDB();
    const totalCount = await FAQ.countDocuments();
    if (totalCount > 0) {
      const docs = await FAQ.find({ published: true, category }).sort({ order: 1, createdAt: 1 }).lean();
      return docs.map(normalizeDbFaq);
    }
  } catch (error) {
    console.error("[faqs] Failed to load from DB:", error);
  }
  return getStaticPublishedFaqs().filter((f) => f.category === category);
}
