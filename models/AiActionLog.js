import mongoose from "mongoose";

const AiActionLogSchema = new mongoose.Schema(
  {
    adminId: { type: String, required: true, index: true },
    adminName: { type: String, default: "Admin" },
    prompt: { type: String, required: true, trim: true },
    action: { type: String, required: true, index: true },
    tool: { type: String, required: true, index: true },
    entityType: { type: String, enum: ["service", "blog", "project", "faq", "testimonial", "lead", "settings", "audit", "system"], index: true },
    entityId: { type: String, default: "" },
    entitySlug: { type: String, default: "" },
    status: { type: String, enum: ["completed", "failed", "pending_confirmation", "reverted"], default: "completed", index: true },
    summary: { type: String, default: "" },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    error: { type: String, default: "" },
  },
  { timestamps: true }
);

AiActionLogSchema.index({ createdAt: -1 });

export default mongoose.models?.AiActionLog || mongoose.model("AiActionLog", AiActionLogSchema);
