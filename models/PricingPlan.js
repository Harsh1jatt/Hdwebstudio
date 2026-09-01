import mongoose from "mongoose";

const PricingPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    currency: {
      type: String,
      trim: true,
      default: "₹",
    },

    billingPeriod: {
      type: String,
      trim: true,
      enum: ["one-time", "monthly", "yearly", "per-project"],
      default: "one-time",
    },

    features: {
      type: [String],
      default: [],
    },

    highlighted: {
      type: Boolean,
      default: false,
    },

    badge: {
      type: String,
      trim: true,
      default: "",
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },

    ctaText: {
      type: String,
      trim: true,
      default: "Get Started",
    },

    ctaUrl: {
      type: String,
      trim: true,
      default: "/contact",
    },

    order: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },

    published: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

PricingPlanSchema.index({
  published: 1,
  order: 1,
});

export default mongoose.models.PricingPlan ||
  mongoose.model("PricingPlan", PricingPlanSchema);