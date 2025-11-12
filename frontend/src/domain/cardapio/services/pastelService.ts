import { publicClient } from '@/core/lib/api';
import type { Pastel, PastelListParams } from '../types';

/**
 * @service pastelService
 * @summary Service for pastel operations using REST API
 * @domain cardapio
 * @type rest-service
 * @apiContext external
 */
export const pastelService = {
  /**
   * @endpoint GET /api/v1/external/public/pastel
   * @summary Fetches list of pastries with optional filters
   */
  async list(params?: PastelListParams): Promise<Pastel[]> {
    const queryParams: Record<string, string | number | boolean> = {};

    if (params?.idCategoria !== undefined) {
      queryParams.idCategoria = params.idCategoria;
    }
    if (params?.precoMin !== undefined) {
      queryParams.precoMin = params.precoMin;
    }
    if (params?.precoMax !== undefined) {
      queryParams.precoMax = params.precoMax;
    }
    if (params?.ingrediente) {
      queryParams.ingrediente = params.ingrediente;
    }
    if (params?.restricao) {
      queryParams.restricao = params.restricao;
    }
    if (params?.apenasDisponiveis !== undefined) {
      queryParams.apenasDisponiveis = params.apenasDisponiveis ? 1 : 0;
    }
    if (params?.ordenacao) {
      queryParams.ordenacao = params.ordenacao;
    }

    const response = await publicClient.get('/public/pastel', { params: queryParams });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/public/pastel/:id
   * @summary Fetches single pastel by ID
   */
  async getById(id: number): Promise<Pastel> {
    const response = await publicClient.get(`/public/pastel/${id}`);
    return response.data.data;
  },
};
