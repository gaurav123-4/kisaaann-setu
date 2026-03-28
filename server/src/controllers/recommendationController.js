import { asyncHandler } from '../utils/asyncHandler.js';
import { soilCropRecommendations } from '../services/recommendationService.js';

export const soilCrop = asyncHandler(async (req, res) => {
  const { soilType, district } = req.query;
  const data = soilCropRecommendations(soilType, district);
  res.json(data);
});
