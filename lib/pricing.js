import connectDB from "./db";
import PricingPlan from "../models/PricingPlan";

function normalizeDbPlan(doc) {
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    description: doc.description || "",
    price: doc.price,
    discountPrice: doc.discountPrice || "",
    currency: doc.currency || "₹",
    billingPeriod: doc.billingPeriod || "",
    features: doc.features || [],
    highlighted: doc.highlighted || false,
    badge: doc.badge || "",
    icon: doc.icon || "",
    ctaText: doc.ctaText || "Get Started",
    ctaUrl: doc.ctaUrl || "/contact",
    note: doc.note || "",
    order: doc.order ?? 0,
  };
}

export async function getPublishedPricingPlans() {
  try {
    await connectDB();
    const docs = await PricingPlan.find({ published: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return docs.map(normalizeDbPlan);
  } catch (error) {
    console.error("[pricing] Failed to load from DB:", error);
    return [];
  }
}
