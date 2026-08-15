import mongoose from "mongoose";

const HighlightSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "Circle" },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const OverviewSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    paragraphs: { type: [String], default: [] },
    highlights: { type: [HighlightSchema], default: [] },
  },
  { _id: false }
);

const IconTextItemSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "Circle" },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const HeroStatSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const FaqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true, trim: true },
    a: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ServiceSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    icon: { type: String, default: "Globe", trim: true },
    eyebrow: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    shortDescription: { type: String, trim: true, default: "" },
    description: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: "" },
    accent: {
      type: String,
      enum: ["blue", "emerald", "purple", "orange"],
      default: "blue",
    },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
    heroStats: { type: [HeroStatSchema], default: [] },
    overview: { type: OverviewSchema, required: true },
    whatYouGet: { type: [IconTextItemSchema], default: [] },
    faq: { type: [FaqSchema], default: [] },
    seoTitle: { type: String, trim: true, default: "" },
    seoDescription: { type: String, trim: true, default: "" },
    ogImage: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

ServiceSchema.index({ published: 1, order: 1 });
ServiceSchema.index({ eyebrow: "text", title: "text", slug: "text" });

export default mongoose.models?.Service ||
  mongoose.model("Service", ServiceSchema);
