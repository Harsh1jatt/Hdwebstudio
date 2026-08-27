import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      trim: true,
      default: "",
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    /*
     * Cloudinary public ID.
     *
     * Example:
     * hd-web-studios/blog/my-blog-image-abc1
     */
    publicId: {
      type: String,
      trim: true,
      default: "",
    },

    mimeType: {
      type: String,
      trim: true,
      default: "",
    },

    size: {
      type: Number,
      default: 0,
    },

    width: {
      type: Number,
      default: 0,
    },

    height: {
      type: Number,
      default: 0,
    },

    alt: {
      type: String,
      trim: true,
      default: "",
    },

    /*
     * Logical folder key.
     *
     * Examples:
     * blog
     * services
     * projects
     * stories
     * team
     * media
     * og
     * general
     */
    folder: {
      type: String,
      trim: true,
      default: "general",
      index: true,
    },

    uploadedBy: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/*
 * Fast folder + latest media queries.
 */
MediaSchema.index({
  folder: 1,
  createdAt: -1,
});

/*
 * Text search for media library.
 */
MediaSchema.index(
  {
    filename: "text",
    alt: "text",
    originalName: "text",
  },
  {
    name: "media_text_search",
  }
);

export default mongoose.models.Media ||
  mongoose.model("Media", MediaSchema);