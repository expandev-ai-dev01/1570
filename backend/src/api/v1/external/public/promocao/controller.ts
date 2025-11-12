import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { promocaoList, promocaoGet } from '@/services/promocao';

/**
 * @api {get} /api/v1/external/public/promocao List Promotions
 * @apiName ListPromocoes
 * @apiGroup Promocao
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists promotions with optional filtering and ordering
 *
 * @apiParam {String} [status] Filter by promotion status (agendada, ativa, encerrada)
 * @apiParam {String} [categoria] Filter by promotion category
 * @apiParam {String} [dataInicio] Start date for date range filter (YYYY-MM-DD)
 * @apiParam {String} [dataFim] End date for date range filter (YYYY-MM-DD)
 * @apiParam {Boolean} [apenasDestaque=false] Filter only featured promotions
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object[]} data Array of promotions
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const querySchema = z.object({
      status: z.enum(['agendada', 'ativa', 'encerrada']).optional(),
      categoria: z.enum(['diaria', 'semanal', 'sazonal', 'data_comemorativa']).optional(),
      dataInicio: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
      dataFim: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
      apenasDestaque: z.coerce.number().int().min(0).max(1).optional(),
    });

    const validated = querySchema.parse(req.query);

    const data = await promocaoList({
      status: validated.status,
      categoria: validated.categoria,
      dataInicio: validated.dataInicio,
      dataFim: validated.dataFim,
      apenasDestaque: validated.apenasDestaque === 1,
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
 * @api {get} /api/v1/external/public/promocao/:id Get Promotion Details
 * @apiName GetPromocao
 * @apiGroup Promocao
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific promotion
 *
 * @apiParam {Number} id Promotion identifier
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Promotion details
 *
 * @apiError {String} ValidationError Invalid ID
 * @apiError {String} NotFound Promotion not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const validated = paramsSchema.parse(req.params);

    const data = await promocaoGet(validated.id);
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
