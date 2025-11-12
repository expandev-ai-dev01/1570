import { getPool } from '@/instances/database';
import { PromocaoListParams, PromocaoListItem, PromocaoDetail } from './promocaoTypes';

/**
 * @summary
 * Lists promotions with optional filtering and ordering
 *
 * @function promocaoList
 * @module promocao
 *
 * @param {PromocaoListParams} params - Filter and ordering parameters
 *
 * @returns {Promise<PromocaoListItem[]>} List of promotions
 *
 * @throws {ValidationError} When parameters are invalid
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const promocoes = await promocaoList({
 *   status: 'ativa',
 *   apenasDestaque: true
 * });
 */
export async function promocaoList(params: PromocaoListParams): Promise<PromocaoListItem[]> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('status', params.status)
    .input('categoria', params.categoria)
    .input('dataInicio', params.dataInicio)
    .input('dataFim', params.dataFim)
    .input('apenasDestaque', params.apenasDestaque ?? false)
    .execute('[functional].[spPromocaoList]');

  return result.recordset;
}

/**
 * @summary
 * Retrieves detailed information about a specific promotion
 *
 * @function promocaoGet
 * @module promocao
 *
 * @param {number} idPromocao - Promotion identifier
 *
 * @returns {Promise<PromocaoDetail>} Promotion details
 *
 * @throws {ValidationError} When promotion doesn't exist
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const promocao = await promocaoGet(1);
 */
export async function promocaoGet(idPromocao: number): Promise<PromocaoDetail> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idPromocao', idPromocao)
    .execute('[functional].[spPromocaoGet]');

  return result.recordset[0];
}
