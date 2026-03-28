import mongoose from 'mongoose';

const agriContentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['scheme', 'tip', 'bulletin', 'market'], required: true },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    regionTags: [{ type: String, trim: true }],
    validFrom: { type: Date, default: null },
    validTo: { type: Date, default: null },
    priority: { type: Number, default: 0 },
  },
  { timestamps: true }
);

agriContentSchema.index({ type: 1, regionTags: 1 });

export const AgriContent = mongoose.model('AgriContent', agriContentSchema);
