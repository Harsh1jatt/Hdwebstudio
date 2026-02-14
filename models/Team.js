import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  image: String,
  bio: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);