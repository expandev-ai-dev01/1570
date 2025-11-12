import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/response';
import { estabelecimentoGet } from '@/services/estabelecimento';

/**
 * @api {get} /api/v1/external/public/estabelecimento Get Establishment Information
 * @apiName GetEstabelecimento
 * @apiGroup Estabelecimento
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves complete establishment information including operating hours,
 * address, contact information, history, team, certifications, FAQ, and accessibility
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Establishment complete information
 * @apiSuccess {Object} data.estabelecimento Main establishment data
 * @apiSuccess {Object[]} data.horarioFuncionamento Operating hours by day of week
 * @apiSuccess {Object[]} data.feriados Upcoming holidays with special hours
 * @apiSuccess {Object[]} data.imagensHistoria Historical images
 * @apiSuccess {Object[]} data.equipe Team members
 * @apiSuccess {Object[]} data.certificacoes Certifications and awards
 * @apiSuccess {Object[]} data.perguntasFrequentes Frequently asked questions
 * @apiSuccess {Object[]} data.imagensAcessibilidade Accessibility images
 *
 * @apiError {String} NotFound Establishment not found
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await estabelecimentoGet();
    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res
        .status(404)
        .json({ success: false, error: { code: 'NOT_FOUND', message: error.message } });
    } else {
      next(error);
    }
  }
}
