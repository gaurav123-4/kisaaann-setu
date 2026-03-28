import mongoose from 'mongoose';

const sensorReadingSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true },
    recordedAt: { type: Date, default: Date.now, index: true },
    temperatureC: Number,
    humidityPct: Number,
    soilMoisturePct: Number,
    soilPh: Number,
    rainfallMm: Number,
    batteryPct: Number,
    raw: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

sensorReadingSchema.index({ deviceId: 1, recordedAt: -1 });

export const SensorReading = mongoose.model('SensorReading', sensorReadingSchema);
