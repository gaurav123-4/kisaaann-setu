import { AgriContent } from '../models/AgriContent.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listContent = asyncHandler(async (req, res) => {
  const { type, district, limit } = req.query;
  const now = new Date();
  const conditions = [];

  if (type) conditions.push({ type });
  if (district) {
    const esc = district.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    conditions.push({
      $or: [{ regionTags: { $size: 0 } }, { regionTags: new RegExp(`^${esc}$`, 'i') }],
    });
  }
  conditions.push({ $or: [{ validFrom: null }, { validFrom: { $lte: now } }] });
  conditions.push({ $or: [{ validTo: null }, { validTo: { $gte: now } }] });

  const filter = conditions.length === 1 ? conditions[0] : { $and: conditions };

  const items = await AgriContent.find(filter)
    .sort({ priority: -1, createdAt: -1 })
    .limit(limit)
    .select('-__v');
  res.json({ items });
});
