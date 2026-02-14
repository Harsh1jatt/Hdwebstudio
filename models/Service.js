import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  icon: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);