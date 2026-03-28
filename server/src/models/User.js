import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: '' },
    role: { type: String, enum: ['farmer', 'admin'], default: 'farmer' },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function toJSON() {
  const o = this.toObject();
  delete o.passwordHash;
  return o;
};

export const User = mongoose.model('User', userSchema);
