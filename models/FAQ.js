import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: "General" },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

FAQSchema.index({ published: 1, order: 1 });
FAQSchema.index({ category: 1, published: 1 });
FAQSchema.index(
  { question: "text", answer: "text" },
  { name: "faq_text_search" }
);

export default mongoose.models.FAQ || mongoose.model("FAQ", FAQSchema);
