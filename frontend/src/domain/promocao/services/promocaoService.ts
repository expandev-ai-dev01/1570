import { publicClient } from '@/core/lib/api';
import type { Promocao, PromocaoListParams } from '../types';

/**
 * @service promocaoService
 * @summary Service for promotion operations using REST API
 * @domain promocao
 * @type rest-service
 * @apiContext external
 */
export const promocaoService = {
  /**
   * @endpoint GET /api/v1/external/public/promocao
   * @summary Fetches list of promotions with optional filters
   */
  async list(params?: PromocaoListParams): Promise<Promocao[]> {
    const queryParams: Record<string, string | number> = {};

    if (params?.status) {
      queryParams.status = params.status;
    }
    if (params?.categoria) {
      queryParams.categoria = params.categoria;
    }
    if (params?.dataInicio) {
      queryParams.dataInicio = params.dataInicio;
    }
    if (params?.dataFim) {
      queryParams.dataFim = params.dataFim;
    }
    if (params?.apenasDestaque !== undefined) {
      queryParams.apenasDestaque = params.apenasDestaque ? 1 : 0;
    }

    const response = await publicClient.get('/public/promocao', { params: queryParams });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/public/promocao/:id
   * @summary Fetches single promotion by ID
   */
  async getById(id: number): Promise<Promocao> {
    const response = await publicClient.get(`/public/promocao/${id}`);
    return response.data.data;
  },
};
