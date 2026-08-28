import mongoose from "mongoose";

const RedirectSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    statusCode: {
      type: Number,
      enum: [301, 302, 307, 308],
      default: 301,
    },
    reason: {
      type: String,
      trim: true,
      default: "URL migration",
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    hits: {
      type: Number,
      default: 0,
    },
    lastTriggeredAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

RedirectSchema.index({ source: 1, active: 1 });

export default mongoose.models?.Redirect || mongoose.model("Redirect", RedirectSchema);
