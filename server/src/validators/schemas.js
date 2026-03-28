import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1).max(120),
  phone: z.string().max(20).optional().default(''),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const farmerProfileUpdateSchema = z.object({
  state: z.string().max(80).optional(),
  district: z.string().max(80).optional(),
  village: z.string().max(120).optional(),
  landholdingHa: z.number().nonnegative().nullable().optional(),
  landCategory: z.enum(['marginal', 'small', 'semi_medium', 'medium', 'large', 'unknown']).optional(),
  primaryCrops: z.array(z.string().max(60)).max(20).optional(),
  soilType: z.string().max(80).optional(),
  irrigationType: z.string().max(80).optional(),
  preferredLanguage: z.enum(['hi', 'en', 'bh']).optional(),
  location: z
    .object({
      lat: z.number().min(-90).max(90).nullable().optional(),
      lng: z.number().min(-180).max(180).nullable().optional(),
    })
    .optional(),
});

export const advisoryQuerySchema = z.object({
  question: z.string().min(3).max(2000),
  crop: z.string().max(80).optional(),
  season: z.string().max(40).optional(),
  district: z.string().max(80).optional(),
});

export const weatherQuerySchema = z
  .object({
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
    district: z.string().max(80).optional(),
  })
  .refine(
    (q) =>
      (q.district != null && q.district.length > 0) ||
      (q.lat != null && q.lng != null),
    { message: 'Provide district, or both lat and lng' }
  );

export const iotDeviceSchema = z.object({
  deviceId: z.string().min(3).max(64),
  plotName: z.string().max(120).optional().default(''),
  location: z
    .object({
      lat: z.number().min(-90).max(90).nullable().optional(),
      lng: z.number().min(-180).max(180).nullable().optional(),
    })
    .optional(),
});

export const sensorReadingSchema = z.object({
  recordedAt: z.coerce.date().optional(),
  temperatureC: z.number().optional(),
  humidityPct: z.number().min(0).max(100).optional(),
  soilMoisturePct: z.number().min(0).max(100).optional(),
  soilPh: z.number().min(0).max(14).optional(),
  rainfallMm: z.number().min(0).optional(),
  batteryPct: z.number().min(0).max(100).optional(),
  raw: z.record(z.unknown()).optional(),
});

export const contentListSchema = z.object({
  type: z.enum(['scheme', 'tip', 'bulletin', 'market']).optional(),
  district: z.string().max(80).optional(),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
});

export const alertsQuerySchema = z.object({
  district: z.string().min(1).max(80),
  limit: z.coerce.number().min(1).max(50).optional().default(20),
});

export const remoteSensingQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
});

export const recommendationQuerySchema = z.object({
  soilType: z.string().max(80).optional().default(''),
  district: z.string().max(80).optional().default(''),
});
