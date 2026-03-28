/**
 * Placeholder for satellite / drone indices (NDVI, NDMI, etc.).
 * Integrate Google Earth Engine, Sentinel Hub, or ISRO Bhuvan APIs here.
 */

export function stubVegetationIndices(lat, lng) {
  const seed = Math.abs(Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453);
  const frac = seed - Math.floor(seed);
  const ndvi = 0.35 + frac * 0.45;
  const ndmi = 0.2 + (1 - frac) * 0.35;

  return {
    lat,
    lng,
    ndvi: Number(ndvi.toFixed(3)),
    ndmi: Number(ndmi.toFixed(3)),
    healthLabel: ndvi > 0.55 ? 'vigorous' : ndvi > 0.4 ? 'moderate' : 'stress_suspected',
    source: 'stub_simulation',
    note: 'Replace stubVegetationIndices with real remote-sensing pipeline for production.',
    generatedAt: new Date().toISOString(),
  };
}
