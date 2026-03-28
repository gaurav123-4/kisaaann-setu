import { ClimateAlert } from '../models/ClimateAlert.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listAlerts = asyncHandler(async (req, res) => {
  const { district, limit } = req.query;
  const items = await ClimateAlert.find({
    district: new RegExp(`^${district}$`, 'i'),
    $or: [{ validUntil: null }, { validUntil: { $gte: new Date() } }],
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');
  res.json({ items });
});
