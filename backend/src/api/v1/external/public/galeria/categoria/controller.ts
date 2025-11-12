import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/response';
import { categoriaFotoList } from '@/services/galeria';

/**
 * @api {get} /api/v1/external/public/galeria/categoria List Photo Categories
 * @apiName ListCategoriasFoto
 * @apiGroup Galeria
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all active photo categories with photo count
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object[]} data Array of photo categories
 * @apiSuccess {Number} data.idCategoriaFoto Category identifier
 * @apiSuccess {String} data.nome Category name
 * @apiSuccess {String} data.descricao Category description
 * @apiSuccess {Number} data.ordem Display order
 * @apiSuccess {Number} data.quantidadeFotos Total photos in category
 * @apiSuccess {String} data.dataAtualizacao Last update date
 *
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await categoriaFotoList();
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}
