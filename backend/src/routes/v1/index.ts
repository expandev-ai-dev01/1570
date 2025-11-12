import { Router } from 'express';
import externalRoutes from './externalRoutes';
import internalRoutes from './internalRoutes';

const router = Router();

/**
 * @summary V1 API router configuration
 * @description Separates external (public) and internal (authenticated) routes
 */
router.use('/external', externalRoutes);
router.use('/internal', internalRoutes);

export default router;
