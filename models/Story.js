import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    body: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    imageAlt: { type: String, trim: true, default: "" },
    backgroundColor: { type: String, trim: true, default: "#0f172a" },
    textColor: { type: String, trim: true, default: "#ffffff" },
    ctaText: { type: String, trim: true, default: "" },
    ctaUrl: { type: String, trim: true, default: "" },
  },
  { _id: true }
);

const StorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: { type: String, trim: true, default: "" },
    publisher: { type: String, trim: true, default: "HD Web Studios" },
    publisherLogo: { type: String, trim: true, default: "" },
    posterImage: { type: String, trim: true, default: "" },
    posterImageAlt: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "" },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    slides: [SlideSchema],
    publishedAt: { type: Date, default: null, index: true },

    // SEO
    seoTitle: { type: String, trim: true, default: "" },
    seoDescription: { type: String, trim: true, default: "" },
    ogImage: { type: String, trim: true, default: "" },
    canonicalUrl: { type: String, trim: true, default: "" },
    noindex: { type: Boolean, default: false },
  },
  { timestamps: true }
);

StorySchema.index({ status: 1, publishedAt: -1 });
StorySchema.index({ category: 1, status: 1 });
StorySchema.index({ tags: 1 });

export default mongoose.models?.Story || mongoose.model("Story", StorySchema);
