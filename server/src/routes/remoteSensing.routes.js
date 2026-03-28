import { Router } from 'express';
import { getIndices } from '../controllers/remoteSensingController.js';
import { validateQuery } from '../middleware/validate.js';
import { remoteSensingQuerySchema } from '../validators/schemas.js';

const router = Router();

router.get('/indices', validateQuery(remoteSensingQuerySchema), getIndices);

export default router;
