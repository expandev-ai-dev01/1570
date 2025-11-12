import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '@/utils/response';
import { categoriaList } from '@/services/categoria';

/**
 * @api {get} /api/v1/external/public/categoria List Categories
 * @apiName ListCategorias
 * @apiGroup Categoria
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all active categories with available pastries
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object[]} data Array of categories
 * @apiSuccess {Number} data.idCategoria Category identifier
 * @apiSuccess {String} data.nome Category name
 * @apiSuccess {String} data.descricao Category description
 * @apiSuccess {String} data.icone Category icon
 * @apiSuccess {Number} data.ordem Display order
 * @apiSuccess {Number} data.totalPasteis Total pastries in category
 *
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await categoriaList();
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}
