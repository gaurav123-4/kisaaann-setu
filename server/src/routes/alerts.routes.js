import { Router } from 'express';
import { listAlerts } from '../controllers/alertController.js';
import { validateQuery } from '../middleware/validate.js';
import { alertsQuerySchema } from '../validators/schemas.js';

const router = Router();

router.get('/', validateQuery(alertsQuerySchema), listAlerts);

export default router;
