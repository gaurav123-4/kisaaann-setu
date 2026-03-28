import mongoose from 'mongoose';

const advisoryLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: String, required: true },
    context: {
      crop: String,
      season: String,
      district: String,
    },
    response: { type: String, required: true },
    source: { type: String, enum: ['openai', 'rules', 'hybrid'], default: 'rules' },
  },
  { timestamps: true }
);

advisoryLogSchema.index({ userId: 1, createdAt: -1 });

export const AdvisoryLog = mongoose.model('AdvisoryLog', advisoryLogSchema);
