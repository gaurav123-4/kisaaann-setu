/** Approximate centroids for advisory / weather defaults (Uttar Pradesh focus). */
export const UP_DISTRICT_COORDS = {
  Siddharthnagar: { lat: 27.25, lng: 82.95, state: 'Uttar Pradesh' },
  Balrampur: { lat: 27.43, lng: 82.18, state: 'Uttar Pradesh' },
  Lucknow: { lat: 26.85, lng: 80.95, state: 'Uttar Pradesh' },
  Gorakhpur: { lat: 26.76, lng: 83.37, state: 'Uttar Pradesh' },
  Varanasi: { lat: 25.32, lng: 82.97, state: 'Uttar Pradesh' },
};

export function resolveDistrictCoords(districtName) {
  if (!districtName || typeof districtName !== 'string') return null;
  const key = Object.keys(UP_DISTRICT_COORDS).find(
    (k) => k.toLowerCase() === districtName.trim().toLowerCase()
  );
  return key ? { district: key, ...UP_DISTRICT_COORDS[key] } : null;
}
