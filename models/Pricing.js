import mongoose from 'mongoose';

const PricingSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  price: { type: Number, required: true },
  features: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Pricing || mongoose.model('Pricing', PricingSchema);