import { FarmerProfile } from '../models/FarmerProfile.js';
import { User } from '../models/User.js';
import { HttpError } from '../utils/HttpError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { resolveDistrictCoords } from '../config/upDistricts.js';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) throw new HttpError(404, 'User not found');
  let profile = await FarmerProfile.findOne({ userId: req.userId });
  if (!profile) {
    profile = await FarmerProfile.create({ userId: req.userId });
  }
  res.json({ user: user.toJSON(), profile });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  const profile = await FarmerProfile.findOneAndUpdate({ userId: req.userId }, updates, {
    new: true,
    runValidators: true,
  });
  if (!profile) throw new HttpError(404, 'Profile not found');

  if (profile.district && (!profile.location?.lat || !profile.location?.lng)) {
    const coords = resolveDistrictCoords(profile.district);
    if (coords) {
      profile.location = { lat: coords.lat, lng: coords.lng };
      await profile.save();
    }
  }

  res.json({ profile });
});
