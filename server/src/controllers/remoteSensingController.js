import { stubVegetationIndices } from '../services/remoteSensingService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getIndices = asyncHandler(async (req, res) => {
  const { lat, lng } = req.query;
  const data = stubVegetationIndices(lat, lng);
  res.json(data);
});
