import { Router } from 'express';
import { soilCrop } from '../controllers/recommendationController.js';
import { validateQuery } from '../middleware/validate.js';
import { recommendationQuerySchema } from '../validators/schemas.js';

const router = Router();

router.get('/soil-crop', validateQuery(recommendationQuerySchema), soilCrop);

export default router;
