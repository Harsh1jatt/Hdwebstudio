import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: false, trim: true },
  phone: { type: String, required: true, trim: true },
  business: { type: String },
  message: { type: String, required: true, trim: true },
  source: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Avoid model overwrite in dev with HMR
export default mongoose.models?.Contact || mongoose.model('Contact', ContactSchema);
