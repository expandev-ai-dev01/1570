import { getPool } from '@/instances/database';
import { ExpectedReturn, IRecordSet } from '@/types';

/**
 * @interface CategoriaListItem
 * @description Category list item with pastel count
 */
export interface CategoriaListItem {
  idCategoria: number;
  nome: string;
  descricao: string;
  icone: string | null;
  ordem: number;
  totalPasteis: number;
}

/**
 * @summary
 * Lists all active categories with available pastries
 *
 * @function categoriaList
 * @module categoria
 *
 * @returns {Promise<CategoriaListItem[]>} List of active categories
 *
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const categorias = await categoriaList();
 */
export async function categoriaList(): Promise<CategoriaListItem[]> {
  const pool = await getPool();
  const result = await pool.request().execute('[functional].[spCategoriaList]');

  return result.recordset;
}
