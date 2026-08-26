import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, trim: true },
    originalName: { type: String, trim: true, default: "" },
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true, default: "" }, // Cloudinary public ID
    mimeType: { type: String, trim: true, default: "" },
    size: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    alt: { type: String, trim: true, default: "" },
    folder: { type: String, trim: true, default: "general" },
    uploadedBy: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

MediaSchema.index({ folder: 1, createdAt: -1 });
MediaSchema.index(
  { filename: "text", alt: "text", originalName: "text" },
  { name: "media_text_search" }
);

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
