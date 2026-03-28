import { Router } from 'express';
import { listContent } from '../controllers/contentController.js';
import { validateQuery } from '../middleware/validate.js';
import { contentListSchema } from '../validators/schemas.js';

const router = Router();

router.get('/', validateQuery(contentListSchema), listContent);

export default router;
