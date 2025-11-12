import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

/**
 * @summary API Version routing
 * @description Routes requests to appropriate API version
 */
router.use('/v1', v1Routes);

export default router;
