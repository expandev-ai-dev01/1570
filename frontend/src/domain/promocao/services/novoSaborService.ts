import { publicClient } from '@/core/lib/api';
import type { NovoSabor } from '../types';

/**
 * @service novoSaborService
 * @summary Service for new flavor operations using REST API
 * @domain promocao
 * @type rest-service
 * @apiContext external
 */
export const novoSaborService = {
  /**
   * @endpoint GET /api/v1/external/public/novo-sabor
   * @summary Fetches list of new flavors within novelty period
   */
  async list(apenasDestaqueHome?: boolean): Promise<NovoSabor[]> {
    const queryParams: Record<string, number> = {};

    if (apenasDestaqueHome !== undefined) {
      queryParams.apenasDestaqueHome = apenasDestaqueHome ? 1 : 0;
    }

    const response = await publicClient.get('/public/novo-sabor', { params: queryParams });
    return response.data.data;
  },
};
