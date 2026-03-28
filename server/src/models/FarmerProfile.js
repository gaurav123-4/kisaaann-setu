import mongoose from 'mongoose';

const farmerProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    state: { type: String, default: 'Uttar Pradesh', trim: true },
    district: { type: String, trim: true, default: '' },
    village: { type: String, trim: true, default: '' },
    landholdingHa: { type: Number, min: 0, default: null },
    landCategory: {
      type: String,
      enum: ['marginal', 'small', 'semi_medium', 'medium', 'large', 'unknown'],
      default: 'unknown',
    },
    primaryCrops: [{ type: String, trim: true }],
    soilType: { type: String, trim: true, default: '' },
    irrigationType: { type: String, trim: true, default: '' },
    preferredLanguage: { type: String, enum: ['hi', 'en', 'bh'], default: 'hi' },
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
  },
  { timestamps: true }
);

export const FarmerProfile = mongoose.model('FarmerProfile', farmerProfileSchema);
