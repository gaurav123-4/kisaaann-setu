import { Router } from 'express';
import { getCurrentWeather } from '../controllers/weatherController.js';
import { validateQuery } from '../middleware/validate.js';
import { weatherQuerySchema } from '../validators/schemas.js';

const router = Router();

router.get('/current', validateQuery(weatherQuerySchema), getCurrentWeather);

export default router;
