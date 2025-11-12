import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { novoSaborList } from '@/services/novoSabor';

/**
 * @api {get} /api/v1/external/public/novo-sabor List New Flavors
 * @apiName ListNovosSabores
 * @apiGroup NovoSabor
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists new flavors within novelty period with optional filtering
 *
 * @apiParam {Boolean} [apenasDestaqueHome=false] Filter only home highlighted new flavors
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object[]} data Array of new flavors with pastel details
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const querySchema = z.object({
      apenasDestaqueHome: z.coerce.number().int().min(0).max(1).optional(),
    });

    const validated = querySchema.parse(req.query);

    const data = await novoSaborList({
      apenasDestaqueHome: validated.apenasDestaqueHome === 1,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
