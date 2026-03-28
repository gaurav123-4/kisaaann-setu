import { Router } from 'express';
import {
  registerDevice,
  listDevices,
  ingestReading,
  listReadings,
} from '../controllers/iotController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { iotDeviceSchema, sensorReadingSchema } from '../validators/schemas.js';

const router = Router();

router.use(requireAuth);
router.post('/devices', validateBody(iotDeviceSchema), registerDevice);
router.get('/devices', listDevices);
router.post('/devices/:deviceId/readings', validateBody(sensorReadingSchema), ingestReading);
router.get('/devices/:deviceId/readings', listReadings);

export default router;
