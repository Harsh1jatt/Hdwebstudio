import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
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
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, required: true, default: "" },
    contentFormat: {
      type: String,
      enum: ["html", "markdown"],
      default: "markdown",
    },
    focusKeyword: { type: String, trim: true, default: "" },
    secondaryKeywords: { type: [String], default: [] },
    featuredImage: { type: String, trim: true, default: "" },
    featuredImageAlt: { type: String, trim: true, default: "" },
    category: { type: String, required: true, trim: true, index: true },
    tags: { type: [String], default: [] },
    author: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    publishedAt: { type: Date, default: null, index: true },
    readingTime: { type: Number, default: 0 },

    seoTitle: { type: String, trim: true, default: "" },
    seoDescription: { type: String, trim: true, default: "" },
    ogImage: { type: String, trim: true, default: "" },

    // Convenience for admin/debugging. Not required by rendering.
    updatedBy: { type: String, default: "" },
  },
  { timestamps: true }
);

PostSchema.index({ status: 1, publishedAt: -1 });
PostSchema.index({ category: 1, status: 1 });
PostSchema.index({ tags: 1 });

export default mongoose.models?.Post || mongoose.model("Post", PostSchema);
