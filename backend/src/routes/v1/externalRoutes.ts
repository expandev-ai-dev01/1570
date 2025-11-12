import { Router } from 'express';
import * as categoriaController from '@/api/v1/external/public/categoria/controller';
import * as pastelController from '@/api/v1/external/public/pastel/controller';

const router = Router();

/**
 * @summary External (public) routes configuration
 * @description Routes accessible without authentication
 */

/**
 * @summary Categoria routes
 */
router.get('/public/categoria', categoriaController.listHandler);

/**
 * @summary Pastel routes
 */
router.get('/public/pastel', pastelController.listHandler);
router.get('/public/pastel/:id', pastelController.getHandler);

export default router;
