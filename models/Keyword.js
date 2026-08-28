import mongoose from "mongoose";

const KeywordSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    primaryKeyword: {
      type: String,
      required: true,
      trim: true,
    },
    secondaryKeywords: {
      type: [String],
      default: [],
    },
    cluster: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    location: {
      type: String,
      trim: true,
      default: "Ludhiana, Punjab, India",
    },
    service: {
      type: String,
      trim: true,
      default: "",
    },
    searchIntent: {
      type: String,
      enum: ["Informational", "Navigational", "Commercial Investigation", "Transactional"],
      default: "Commercial Investigation",
    },
    targetAudience: {
      type: String,
      trim: true,
      default: "Local & Regional Business Owners",
    },
    entities: {
      type: [String],
      default: [],
    },
    searchVolume: {
      type: String,
      default: "Unknown",
    },
    difficulty: {
      type: String,
      enum: ["Low", "Medium", "High", "Unknown"],
      default: "Medium",
    },
    targetUrl: {
      type: String,
      trim: true,
      default: "",
    },
    priority: {
      type: String,
      enum: ["Critical", "High", "Medium", "Low"],
      default: "High",
    },
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Ranking", "Optimized", "Backlog"],
      default: "Planned",
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

KeywordSchema.index({ cluster: 1, searchIntent: 1 });

export default mongoose.models?.Keyword || mongoose.model("Keyword", KeywordSchema);
