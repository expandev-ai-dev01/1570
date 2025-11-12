import { publicClient } from '@/core/lib/api';
import type { EstabelecimentoInfo } from '../types';

/**
 * @service estabelecimentoService
 * @summary Service for establishment information operations using REST API
 * @domain estabelecimento
 * @type rest-service
 * @apiContext external
 */
export const estabelecimentoService = {
  /**
   * @endpoint GET /api/v1/external/public/estabelecimento
   * @summary Fetches complete establishment information
   */
  async get(): Promise<EstabelecimentoInfo> {
    const response = await publicClient.get('/public/estabelecimento');
    return response.data.data;
  },
};
