import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String },
  desc: { type: String },
  tech: { type: [String], default: [] },
  img: { type: String },
  live: { type: String },
  caseStudy: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models?.Project || mongoose.model('Project', ProjectSchema);
