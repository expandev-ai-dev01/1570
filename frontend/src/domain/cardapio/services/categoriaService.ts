import { publicClient } from '@/core/lib/api';
import type { Categoria } from '../types';

/**
 * @service categoriaService
 * @summary Service for categoria operations using REST API
 * @domain cardapio
 * @type rest-service
 * @apiContext external
 */
export const categoriaService = {
  /**
   * @endpoint GET /api/v1/external/public/categoria
   * @summary Fetches list of active categories with available pastries
   */
  async list(): Promise<Categoria[]> {
    const response = await publicClient.get('/public/categoria');
    return response.data.data;
  },
};
