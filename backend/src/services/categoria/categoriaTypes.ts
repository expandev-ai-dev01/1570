/**
 * @summary Type definitions for categoria service
 */

/**
 * @interface CategoriaListItem
 * @description Category list item with pastel count
 *
 * @property {number} idCategoria - Category identifier
 * @property {string} nome - Category name
 * @property {string} descricao - Category description
 * @property {string | null} icone - Category icon URL or name
 * @property {number} ordem - Display order
 * @property {number} totalPasteis - Total active pastries in category
 */
export interface CategoriaListItem {
  idCategoria: number;
  nome: string;
  descricao: string;
  icone: string | null;
  ordem: number;
  totalPasteis: number;
}
