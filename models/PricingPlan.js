import mongoose from "mongoose";

const PricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, trim: true, default: "" },
    price: { type: String, required: true, trim: true },
    discountPrice: { type: String, trim: true, default: "" },
    currency: { type: String, trim: true, default: "₹" },
    billingPeriod: { type: String, trim: true, default: "" },
    features: { type: [String], default: [] },
    highlighted: { type: Boolean, default: false },
    badge: { type: String, trim: true, default: "" },
    icon: { type: String, trim: true, default: "" },
    note: { type: String, trim: true, default: "" },
    ctaText: { type: String, trim: true, default: "Get Started" },
    ctaUrl: { type: String, trim: true, default: "/contact" },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

PricingPlanSchema.index({ published: 1, order: 1 });

export default mongoose.models.PricingPlan ||
  mongoose.model("PricingPlan", PricingPlanSchema);
