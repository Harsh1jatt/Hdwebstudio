import mongoose from "mongoose";

const BacklinkSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    websiteName: {
      type: String,
      required: true,
      trim: true,
    },
    targetUrl: {
      type: String,
      required: true,
      trim: true,
    },
    opportunityUrl: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: [
        "Business Directory",
        "Local Citation",
        "Profile",
        "Partner",
        "Press",
        "Guest Post",
        "Resource Page",
        "Portfolio Platform",
        "Industry Association",
        "Client Website",
        "Other",
      ],
      default: "Business Directory",
    },
    category: {
      type: String,
      trim: true,
      default: "Web Development",
    },
    country: {
      type: String,
      trim: true,
      default: "India",
    },
    niche: {
      type: String,
      trim: true,
      default: "Technology & Business",
    },
    linkType: {
      type: String,
      enum: ["dofollow", "nofollow", "sponsored", "ugc", "unknown"],
      default: "dofollow",
    },
    pricing: {
      type: String,
      enum: ["Free", "Paid", "Exchange", "Unknown"],
      default: "Free",
    },
    status: {
      type: String,
      enum: [
        "Prospect",
        "Contacted",
        "Negotiating",
        "Approved",
        "Published",
        "Verified",
        "Lost",
      ],
      default: "Prospect",
      index: true,
    },
    authorityScore: {
      type: String,
      default: "Not available",
    },
    domainRating: {
      type: String,
      default: "Not available",
    },
    trafficEstimate: {
      type: String,
      default: "Not available",
    },
    anchorText: {
      type: String,
      trim: true,
      default: "HD Web Studios",
    },
    contactEmail: {
      type: String,
      trim: true,
      default: "",
    },
    contactName: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    safetyScore: {
      type: String,
      enum: ["SAFE", "REVIEW", "AVOID"],
      default: "SAFE",
    },
    safetyReason: {
      type: String,
      default: "Reputable business authority source",
    },
    opportunityScore: {
      type: Number,
      default: 75,
      min: 0,
      max: 100,
    },
    dateContacted: {
      type: Date,
      default: null,
    },
    datePublished: {
      type: Date,
      default: null,
    },
    lastVerifiedAt: {
      type: Date,
      default: null,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

BacklinkSchema.index({ status: 1, domain: 1 });
BacklinkSchema.index({ opportunityScore: -1 });

export default mongoose.models?.Backlink || mongoose.model("Backlink", BacklinkSchema);
