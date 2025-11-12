import { publicClient } from '@/core/lib/api';
import type { Foto, FotoListParams } from '../types';

/**
 * @service fotoService
 * @summary Service for photo operations using REST API
 * @domain galeria
 * @type rest-service
 * @apiContext external
 */
export const fotoService = {
  /**
   * @endpoint GET /api/v1/external/public/galeria/foto
   * @summary Fetches list of photos with optional filters
   */
  async list(params?: FotoListParams): Promise<Foto[]> {
    const queryParams: Record<string, string | number> = {};

    if (params?.idCategoriaFoto !== undefined) {
      queryParams.idCategoriaFoto = params.idCategoriaFoto;
    }
    if (params?.dataInicio) {
      queryParams.dataInicio = params.dataInicio;
    }
    if (params?.dataFim) {
      queryParams.dataFim = params.dataFim;
    }
    if (params?.ordenacao) {
      queryParams.ordenacao = params.ordenacao;
    }

    const response = await publicClient.get('/public/galeria/foto', { params: queryParams });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/public/galeria/foto/:id
   * @summary Fetches single photo by ID
   */
  async getById(id: number): Promise<Foto> {
    const response = await publicClient.get(`/public/galeria/foto/${id}`);
    return response.data.data;
  },
};
