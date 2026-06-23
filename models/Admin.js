import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

AdminSchema.methods.verifyPassword = function(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

export default mongoose.models?.Admin || mongoose.model('Admin', AdminSchema);
