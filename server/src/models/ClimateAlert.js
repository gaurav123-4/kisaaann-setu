import mongoose from 'mongoose';

const climateAlertSchema = new mongoose.Schema(
  {
    district: { type: String, required: true, trim: true, index: true },
    severity: { type: String, enum: ['info', 'watch', 'warning', 'severe'], default: 'info' },
    title: { type: String, required: true },
    body: { type: String, required: true },
    validUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

climateAlertSchema.index({ district: 1, createdAt: -1 });

export const ClimateAlert = mongoose.model('ClimateAlert', climateAlertSchema);
