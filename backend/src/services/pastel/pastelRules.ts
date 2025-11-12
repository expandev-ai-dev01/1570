import { getPool } from '@/instances/database';
import { ExpectedReturn, IRecordSet } from '@/types';
import { PastelListItem, PastelDetail, PastelListParams } from './pastelTypes';

/**
 * @summary
 * Lists pastries with optional filtering and ordering
 *
 * @function pastelList
 * @module pastel
 *
 * @param {PastelListParams} params - Filter and ordering parameters
 *
 * @returns {Promise<PastelListItem[]>} List of pastries
 *
 * @throws {ValidationError} When parameters are invalid
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const pasteis = await pastelList({
 *   idCategoria: 1,
 *   apenasDisponiveis: true,
 *   ordenacao: 'preco_asc'
 * });
 */
export async function pastelList(params: PastelListParams): Promise<PastelListItem[]> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idCategoria', params.idCategoria)
    .input('precoMin', params.precoMin)
    .input('precoMax', params.precoMax)
    .input('ingrediente', params.ingrediente)
    .input('restricao', params.restricao)
    .input('apenasDisponiveis', params.apenasDisponiveis ?? true)
    .input('ordenacao', params.ordenacao ?? 'nome_asc')
    .execute('[functional].[spPastelList]');

  return result.recordset.map((row: any) => ({
    ...row,
    ingredientes: row.ingredientes ? JSON.parse(row.ingredientes) : [],
    alergenicos: row.alergenicos ? JSON.parse(row.alergenicos) : [],
    infoNutricional: row.infoNutricional ? JSON.parse(row.infoNutricional) : null,
    restricoes: row.restricoes ? JSON.parse(row.restricoes) : [],
  }));
}

/**
 * @summary
 * Retrieves detailed information about a specific pastel
 *
 * @function pastelGet
 * @module pastel
 *
 * @param {number} idPastel - Pastel identifier
 *
 * @returns {Promise<PastelDetail>} Pastel details
 *
 * @throws {ValidationError} When pastel doesn't exist
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const pastel = await pastelGet(1);
 */
export async function pastelGet(idPastel: number): Promise<PastelDetail> {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('idPastel', idPastel)
    .execute('[functional].[spPastelGet]');

  const row = result.recordset[0];

  return {
    ...row,
    ingredientes: row.ingredientes ? JSON.parse(row.ingredientes) : [],
    alergenicos: row.alergenicos ? JSON.parse(row.alergenicos) : [],
    infoNutricional: row.infoNutricional ? JSON.parse(row.infoNutricional) : null,
    restricoes: row.restricoes ? JSON.parse(row.restricoes) : [],
  };
}
