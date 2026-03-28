import { AdvisoryLog } from '../models/AdvisoryLog.js';
import { FarmerProfile } from '../models/FarmerProfile.js';
import { generateAdvisory } from '../services/advisoryService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function buildProfileSummary(profile) {
  if (!profile) return '';
  const parts = [];
  if (profile.district) parts.push(`district: ${profile.district}`);
  if (profile.primaryCrops?.length) parts.push(`crops: ${profile.primaryCrops.join(', ')}`);
  if (profile.soilType) parts.push(`soil: ${profile.soilType}`);
  if (profile.irrigationType) parts.push(`irrigation: ${profile.irrigationType}`);
  if (profile.landCategory && profile.landCategory !== 'unknown') parts.push(`holding: ${profile.landCategory}`);
  return parts.join('; ');
}

export const queryAdvisory = asyncHandler(async (req, res) => {
  const { question, crop, season, district } = req.body;
  const profile = await FarmerProfile.findOne({ userId: req.userId });
  const context = {
    crop: crop || profile?.primaryCrops?.[0],
    season: season || undefined,
    district: district || profile?.district || undefined,
  };
  const profileSummary = buildProfileSummary(profile);

  const { response, source } = await generateAdvisory(question, context, profileSummary);

  const log = await AdvisoryLog.create({
    userId: req.userId,
    question,
    context,
    response,
    source,
  });

  res.json({
    id: log._id,
    response,
    source,
    context,
    createdAt: log.createdAt,
  });
});

export const listHistory = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const items = await AdvisoryLog.find({ userId: req.userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('question context response source createdAt');
  res.json({ items });
});
