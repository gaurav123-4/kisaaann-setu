import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/farmerController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { farmerProfileUpdateSchema } from '../validators/schemas.js';

const router = Router();

router.use(requireAuth);
router.get('/me', getProfile);
router.put('/me', validateBody(farmerProfileUpdateSchema), updateProfile);

export default router;
