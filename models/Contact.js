import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: false, trim: true, default: '' },
    phone: { type: String, required: true, trim: true },
    business: { type: String, trim: true, default: '' },
    website: { type: String, trim: true, default: '' },
    service: { type: String, trim: true, default: '' },
    budget: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true },
    source: { type: String, trim: true, default: 'website' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam'],
      default: 'new',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'normal', 'high', 'urgent'],
      default: 'normal',
      index: true,
    },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ status: 1, createdAt: -1 });
ContactSchema.index({ source: 1, createdAt: -1 });

// Avoid model overwrite in dev with HMR
export default mongoose.models?.Contact || mongoose.model('Contact', ContactSchema);

