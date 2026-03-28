import mongoose from 'mongoose';

const sensorDeviceSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plotName: { type: String, trim: true, default: '' },
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

sensorDeviceSchema.index({ userId: 1 });

export const SensorDevice = mongoose.model('SensorDevice', sensorDeviceSchema);
