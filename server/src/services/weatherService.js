/**
 * Current and short-range forecast using Open-Meteo (no API key).
 * https://open-meteo.com/
 */

const BASE = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeatherSnapshot(lat, lng) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
    ].join(','),
    daily: ['precipitation_sum', 'temperature_2m_max', 'temperature_2m_min'].join(','),
    forecast_days: '5',
    timezone: 'Asia/Kolkata',
  });

  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`);
  }
  const data = await res.json();

  return {
    lat: data.latitude,
    lng: data.longitude,
    timezone: data.timezone,
    current: data.current,
    daily: data.daily,
    fetchedAt: new Date().toISOString(),
  };
}
