import { resolveDistrictCoords } from '../config/upDistricts.js';
import { fetchWeatherSnapshot } from '../services/weatherService.js';
import { HttpError } from '../utils/HttpError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCurrentWeather = asyncHandler(async (req, res) => {
  let { lat, lng, district } = req.query;

  if ((lat == null || lng == null) && district) {
    const resolved = resolveDistrictCoords(district);
    if (!resolved) {
      throw new HttpError(400, 'Unknown district; provide lat/lng or a known UP district name');
    }
    lat = resolved.lat;
    lng = resolved.lng;
    district = resolved.district;
  }

  if (lat == null || lng == null) {
    throw new HttpError(400, 'Provide lat and lng, or district');
  }

  const snapshot = await fetchWeatherSnapshot(lat, lng);
  res.json({ district: district || null, ...snapshot });
});
