import { publicClient } from '@/core/lib/api';
import type { CategoriaFoto } from '../types';

/**
 * @service categoriaFotoService
 * @summary Service for photo category operations using REST API
 * @domain galeria
 * @type rest-service
 * @apiContext external
 */
export const categoriaFotoService = {
  /**
   * @endpoint GET /api/v1/external/public/galeria/categoria
   * @summary Fetches list of active photo categories with photo count
   */
  async list(): Promise<CategoriaFoto[]> {
    const response = await publicClient.get('/public/galeria/categoria');
    return response.data.data;
  },
};
