import { Router } from 'express';
import { queryAdvisory, listHistory } from '../controllers/advisoryController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { advisoryQuerySchema } from '../validators/schemas.js';

const router = Router();

router.use(requireAuth);
router.post('/query', validateBody(advisoryQuerySchema), queryAdvisory);
router.get('/history', listHistory);

export default router;
