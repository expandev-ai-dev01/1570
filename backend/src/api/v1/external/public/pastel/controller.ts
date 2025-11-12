import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { pastelList, pastelGet } from '@/services/pastel';

/**
 * @api {get} /api/v1/external/public/pastel List Pastries
 * @apiName ListPasteis
 * @apiGroup Pastel
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists pastries with optional filtering and ordering
 *
 * @apiParam {Number} [idCategoria] Filter by category ID
 * @apiParam {Number} [precoMin] Minimum price filter
 * @apiParam {Number} [precoMax] Maximum price filter
 * @apiParam {String} [ingrediente] Filter by ingredient
 * @apiParam {String} [restricao] Filter by dietary restriction
 * @apiParam {Boolean} [apenasDisponiveis=true] Filter only available pastries
 * @apiParam {String} [ordenacao=nome_asc] Sort order
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object[]} data Array of pastries
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const querySchema = z.object({
      idCategoria: z.coerce.number().int().positive().optional(),
      precoMin: z.coerce.number().min(0).optional(),
      precoMax: z.coerce.number().min(0).optional(),
      ingrediente: z.string().min(3).optional(),
      restricao: z.enum(['vegetariano', 'vegano', 'sem_gluten', 'sem_lactose']).optional(),
      apenasDisponiveis: z.coerce.number().int().min(0).max(1).optional(),
      ordenacao: z
        .enum(['preco_asc', 'preco_desc', 'nome_asc', 'nome_desc', 'popularidade'])
        .optional(),
    });

    const validated = querySchema.parse(req.query);

    const data = await pastelList({
      idCategoria: validated.idCategoria,
      precoMin: validated.precoMin,
      precoMax: validated.precoMax,
      ingrediente: validated.ingrediente,
      restricao: validated.restricao,
      apenasDisponiveis: validated.apenasDisponiveis === 1,
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
 * @api {get} /api/v1/external/public/pastel/:id Get Pastel Details
 * @apiName GetPastel
 * @apiGroup Pastel
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific pastel
 *
 * @apiParam {Number} id Pastel identifier
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Pastel details
 *
 * @apiError {String} ValidationError Invalid ID
 * @apiError {String} NotFound Pastel not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const validated = paramsSchema.parse(req.params);

    const data = await pastelGet(validated.id);
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
