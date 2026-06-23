import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// prevent model overwrite during HMR
export default mongoose.models?.User || mongoose.model('User', UserSchema);
