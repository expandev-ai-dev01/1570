import { getPool } from '@/instances/database';
import { NovoSaborListParams, NovoSaborListItem } from './novoSaborTypes';

/**
 * @summary
 * Lists new flavors within novelty period with optional filtering
 *
 * @function novoSaborList
 * @module novoSabor
 *
 * @param {NovoSaborListParams} params - Filter parameters
 *
 * @returns {Promise<NovoSaborListItem[]>} List of new flavors with pastel details
 *
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const novosSabores = await novoSaborList({
 *   apenasDestaqueHome: true
 * });
 */
export async function novoSaborList(params: NovoSaborListParams): Promise<NovoSaborListItem[]> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('apenasDestaqueHome', params.apenasDestaqueHome ?? false)
    .execute('[functional].[spNovoSaborList]');

  return result.recordset;
}
