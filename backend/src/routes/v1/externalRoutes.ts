import { Router } from 'express';
import * as categoriaController from '@/api/v1/external/public/categoria/controller';
import * as pastelController from '@/api/v1/external/public/pastel/controller';
import * as galeriaCategoriaController from '@/api/v1/external/public/galeria/categoria/controller';
import * as galeriaFotoController from '@/api/v1/external/public/galeria/foto/controller';
import * as estabelecimentoController from '@/api/v1/external/public/estabelecimento/controller';
import * as promocaoController from '@/api/v1/external/public/promocao/controller';
import * as novoSaborController from '@/api/v1/external/public/novo-sabor/controller';

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

/**
 * @summary Galeria routes
 */
router.get('/public/galeria/categoria', galeriaCategoriaController.listHandler);
router.get('/public/galeria/foto', galeriaFotoController.listHandler);
router.get('/public/galeria/foto/:id', galeriaFotoController.getHandler);

/**
 * @summary Estabelecimento routes
 */
router.get('/public/estabelecimento', estabelecimentoController.getHandler);

/**
 * @summary Promocao routes
 */
router.get('/public/promocao', promocaoController.listHandler);
router.get('/public/promocao/:id', promocaoController.getHandler);

/**
 * @summary Novo Sabor routes
 */
router.get('/public/novo-sabor', novoSaborController.listHandler);

export default router;
