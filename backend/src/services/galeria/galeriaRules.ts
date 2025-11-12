import { getPool } from '@/instances/database';
import { CategoriaFotoListItem, FotoListParams, FotoListItem, FotoDetail } from './galeriaTypes';

/**
 * @summary
 * Lists all active photo categories with photo count
 *
 * @function categoriaFotoList
 * @module galeria
 *
 * @returns {Promise<CategoriaFotoListItem[]>} List of active photo categories
 *
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const categorias = await categoriaFotoList();
 */
export async function categoriaFotoList(): Promise<CategoriaFotoListItem[]> {
  const pool = await getPool();
  const result = await pool.request().execute('[functional].[spCategoriaFotoList]');

  return result.recordset;
}

/**
 * @summary
 * Lists photos with optional filtering and ordering
 *
 * @function fotoList
 * @module galeria
 *
 * @param {FotoListParams} params - Filter and ordering parameters
 *
 * @returns {Promise<FotoListItem[]>} List of photos
 *
 * @throws {ValidationError} When parameters are invalid
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const fotos = await fotoList({
 *   idCategoriaFoto: 1,
 *   ordenacao: 'mais_recentes'
 * });
 */
export async function fotoList(params: FotoListParams): Promise<FotoListItem[]> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idCategoriaFoto', params.idCategoriaFoto)
    .input('dataInicio', params.dataInicio)
    .input('dataFim', params.dataFim)
    .input('ordenacao', params.ordenacao ?? 'mais_recentes')
    .execute('[functional].[spFotoList]');

  return result.recordset;
}

/**
 * @summary
 * Retrieves detailed information about a specific photo
 *
 * @function fotoGet
 * @module galeria
 *
 * @param {number} idFoto - Photo identifier
 *
 * @returns {Promise<FotoDetail>} Photo details
 *
 * @throws {ValidationError} When photo doesn't exist
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const foto = await fotoGet(1);
 */
export async function fotoGet(idFoto: number): Promise<FotoDetail> {
  const pool = await getPool();
  const result = await pool.request().input('idFoto', idFoto).execute('[functional].[spFotoGet]');

  return result.recordset[0];
}
