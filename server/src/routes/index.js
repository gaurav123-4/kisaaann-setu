import { Router } from 'express';
import authRoutes from './auth.routes.js';
import farmersRoutes from './farmers.routes.js';
import advisoryRoutes from './advisory.routes.js';
import weatherRoutes from './weather.routes.js';
import iotRoutes from './iot.routes.js';
import contentRoutes from './content.routes.js';
import alertsRoutes from './alerts.routes.js';
import remoteSensingRoutes from './remoteSensing.routes.js';
import recommendationsRoutes from './recommendations.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/farmers', farmersRoutes);
router.use('/advisory', advisoryRoutes);
router.use('/weather', weatherRoutes);
router.use('/iot', iotRoutes);
router.use('/content', contentRoutes);
router.use('/alerts', alertsRoutes);
router.use('/remote-sensing', remoteSensingRoutes);
router.use('/recommendations', recommendationsRoutes);

router.get('/health', (req, res) => {
  res.json({ ok: true, service: 'kisan-setu-api', version: '1' });
});

export default router;
