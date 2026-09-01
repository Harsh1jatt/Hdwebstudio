import connectDB from "./db";
import PricingPlan from "../models/PricingPlan";

function normalizeDbPlan(doc) {
  if (!doc) return null;

  return {
    id: doc._id.toString(),

    name: doc.name || "",
    slug: doc.slug || "",

    description: doc.description || "",

    price: Number(doc.price) || 0,

    discountPrice:
      doc.discountPrice !== null &&
      doc.discountPrice !== undefined
        ? Number(doc.discountPrice)
        : null,

    currency: doc.currency || "₹",

    billingPeriod: doc.billingPeriod || "one-time",

    features: Array.isArray(doc.features)
      ? doc.features
      : [],

    highlighted: doc.highlighted === true,

    badge: doc.badge || "",

    icon: doc.icon || "",

    ctaText: doc.ctaText || "Get Started",

    ctaUrl: doc.ctaUrl || "/contact",

    note: doc.note || "",

    order: Number(doc.order) || 0,
  };
}

export async function getPublishedPricingPlans() {
  try {
    await connectDB();

    const docs = await PricingPlan.find({
      published: true,
    })
      .sort({
        order: 1,
        createdAt: 1,
      })
      .lean();

    return docs
      .map(normalizeDbPlan)
      .filter(Boolean);
  } catch (error) {
    console.error(
      "[pricing] Failed to load published pricing plans:",
      error
    );

    return [];
  }
}