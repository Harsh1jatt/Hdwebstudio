import connectDB from "./db";
import FAQ from "../models/FAQ";

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

export async function getPublishedFaqs() {
  try {
    await connectDB();
    const docs = await FAQ.find({ published: true }).sort({ order: 1, createdAt: 1 }).lean();
    return docs.map(normalizeDbFaq);
  } catch (error) {
    console.error("[faqs] Failed to load from DB:", error);
    return [];
  }
}

export async function getPublishedFaqsByCategory(category) {
  try {
    await connectDB();
    const docs = await FAQ.find({ published: true, category }).sort({ order: 1, createdAt: 1 }).lean();
    return docs.map(normalizeDbFaq);
  } catch (error) {
    console.error("[faqs] Failed to load from DB:", error);
    return [];
  }
}
