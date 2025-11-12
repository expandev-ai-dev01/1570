import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { fotoList, fotoGet } from '@/services/galeria';

/**
 * @api {get} /api/v1/external/public/galeria/foto List Photos
 * @apiName ListFotos
 * @apiGroup Galeria
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists photos with optional filtering and ordering
 *
 * @apiParam {Number} [idCategoriaFoto] Filter by photo category ID
 * @apiParam {String} [dataInicio] Start date for date range filter (YYYY-MM-DD)
 * @apiParam {String} [dataFim] End date for date range filter (YYYY-MM-DD)
 * @apiParam {String} [ordenacao=mais_recentes] Sort order (mais_recentes, mais_antigas)
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object[]} data Array of photos
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const querySchema = z.object({
      idCategoriaFoto: z.coerce.number().int().positive().optional(),
      dataInicio: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
      dataFim: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
      ordenacao: z.enum(['mais_recentes', 'mais_antigas']).optional(),
    });

    const validated = querySchema.parse(req.query);

    const data = await fotoList({
      idCategoriaFoto: validated.idCategoriaFoto,
      dataInicio: validated.dataInicio,
      dataFim: validated.dataFim,
      ordenacao: validated.ordenacao,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/external/public/galeria/foto/:id Get Photo Details
 * @apiName GetFoto
 * @apiGroup Galeria
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific photo
 *
 * @apiParam {Number} id Photo identifier
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Photo details
 *
 * @apiError {String} ValidationError Invalid ID
 * @apiError {String} NotFound Photo not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const validated = paramsSchema.parse(req.params);

    const data = await fotoGet(validated.id);
    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (error.number === 51000) {
      res.status(404).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
