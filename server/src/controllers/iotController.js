import { SensorDevice } from '../models/SensorDevice.js';
import { SensorReading } from '../models/SensorReading.js';
import { HttpError } from '../utils/HttpError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const registerDevice = asyncHandler(async (req, res) => {
  const { deviceId, plotName, location } = req.body;
  const existing = await SensorDevice.findOne({ deviceId });
  if (existing) {
    if (existing.userId.toString() !== req.userId) {
      throw new HttpError(409, 'Device already registered to another user');
    }
    Object.assign(existing, { plotName, location, isActive: true });
    await existing.save();
    return res.status(200).json({ device: existing });
  }
  const device = await SensorDevice.create({
    deviceId,
    userId: req.userId,
    plotName,
    location,
  });
  res.status(201).json({ device });
});

export const listDevices = asyncHandler(async (req, res) => {
  const devices = await SensorDevice.find({ userId: req.userId }).sort({ updatedAt: -1 });
  res.json({ devices });
});

export const ingestReading = asyncHandler(async (req, res) => {
  const { deviceId } = req.params;
  const device = await SensorDevice.findOne({ deviceId, userId: req.userId });
  if (!device) throw new HttpError(404, 'Device not found');

  const body = req.body;
  const reading = await SensorReading.create({
    deviceId,
    recordedAt: body.recordedAt || new Date(),
    temperatureC: body.temperatureC,
    humidityPct: body.humidityPct,
    soilMoisturePct: body.soilMoisturePct,
    soilPh: body.soilPh,
    rainfallMm: body.rainfallMm,
    batteryPct: body.batteryPct,
    raw: body.raw || {},
  });
  res.status(201).json({ reading });
});

export const listReadings = asyncHandler(async (req, res) => {
  const { deviceId } = req.params;
  const device = await SensorDevice.findOne({ deviceId, userId: req.userId });
  if (!device) throw new HttpError(404, 'Device not found');

  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const readings = await SensorReading.find({ deviceId })
    .sort({ recordedAt: -1 })
    .limit(limit);
  res.json({ readings });
});
