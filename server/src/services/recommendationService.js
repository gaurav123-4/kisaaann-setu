/**
 * Lightweight rule-based crop/soil hints — replace with ML model + GIS layers when available.
 */

const SOIL_CROP_HINTS = {
  alluvial: ['धान', 'गेहूं', 'गन्ना', 'दालें'],
  loam: ['गेहूं', 'सरसों', 'आलू', 'सब्जियां'],
  clay: ['धान', 'गेहूं'],
  sandy: ['मूंगफली', 'बाजरा', 'सब्जियां (सिंचित)'],
  black: ['कपास', 'सोयाबीन', 'गेहूं'],
};

export function soilCropRecommendations(soilType, district) {
  const key = (soilType || '').toLowerCase();
  const matched = Object.keys(SOIL_CROP_HINTS).find((k) => key.includes(k));
  const crops = matched ? SOIL_CROP_HINTS[matched] : ['गेहूं', 'धान', 'दालें', 'तिलहन'];

  return {
    soilType: soilType || 'unknown',
    district: district || null,
    suggestedCrops: crops,
    practices: [
      'फसल चक्र अपनाकर मिट्टी थकान कम करें।',
      'जैविक खाद व कम्पोस्ट से जैविक पदार्थ बढ़ाएं।',
      'मल्चिंग से वाष्पीकरण और मिट्टी कटाव कम करें।',
    ],
    note: 'These are indicative suggestions; validate with soil test and local extension services.',
  };
}

export function simpleResilienceScore({ recentRainfallMm, soilMoisturePct, tempC }) {
  let score = 70;
  if (typeof soilMoisturePct === 'number') {
    if (soilMoisturePct < 25) score -= 15;
    if (soilMoisturePct > 85) score -= 5;
  }
  if (typeof recentRainfallMm === 'number' && recentRainfallMm < 2) score -= 10;
  if (typeof tempC === 'number' && tempC > 38) score -= 10;
  return Math.max(0, Math.min(100, Math.round(score)));
}
