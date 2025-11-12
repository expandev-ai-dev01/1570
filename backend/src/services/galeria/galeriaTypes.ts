/**
 * @summary Type definitions for galeria service
 */

/**
 * @interface CategoriaFotoListItem
 * @description Photo category list item with photo count
 *
 * @property {number} idCategoriaFoto - Photo category identifier
 * @property {string} nome - Category name
 * @property {string} descricao - Category description
 * @property {number} ordem - Display order
 * @property {number} quantidadeFotos - Total active photos in category
 * @property {Date} dataAtualizacao - Last update date
 */
export interface CategoriaFotoListItem {
  idCategoriaFoto: number;
  nome: string;
  descricao: string;
  ordem: number;
  quantidadeFotos: number;
  dataAtualizacao: Date;
}

/**
 * @interface FotoListParams
 * @description Parameters for filtering and ordering photo list
 *
 * @property {number} [idCategoriaFoto] - Filter by photo category ID
 * @property {string} [dataInicio] - Start date for date range filter (YYYY-MM-DD)
 * @property {string} [dataFim] - End date for date range filter (YYYY-MM-DD)
 * @property {string} [ordenacao] - Sort order (mais_recentes, mais_antigas)
 */
export interface FotoListParams {
  idCategoriaFoto?: number;
  dataInicio?: string;
  dataFim?: string;
  ordenacao?: string;
}

/**
 * @interface FotoListItem
 * @description Photo list item with basic information
 *
 * @property {number} idFoto - Photo identifier
 * @property {number} idCategoriaFoto - Photo category identifier
 * @property {string} categoriaNome - Category name
 * @property {string} titulo - Photo title
 * @property {string | null} descricao - Photo description
 * @property {string} urlFoto - Photo URL (full size)
 * @property {string} urlMiniatura - Thumbnail URL
 * @property {Date} dataFoto - Photo date
 * @property {string | null} creditos - Photo credits
 */
export interface FotoListItem {
  idFoto: number;
  idCategoriaFoto: number;
  categoriaNome: string;
  titulo: string;
  descricao: string | null;
  urlFoto: string;
  urlMiniatura: string;
  dataFoto: Date;
  creditos: string | null;
}

/**
 * @interface FotoDetail
 * @description Detailed photo information
 *
 * @property {number} idFoto - Photo identifier
 * @property {number} idCategoriaFoto - Photo category identifier
 * @property {string} categoriaNome - Category name
 * @property {string} titulo - Photo title
 * @property {string | null} descricao - Photo description
 * @property {string} urlFoto - Photo URL (full size)
 * @property {string} urlMiniatura - Thumbnail URL
 * @property {Date} dataFoto - Photo date
 * @property {string | null} creditos - Photo credits
 * @property {boolean} ativa - Active status
 */
export interface FotoDetail {
  idFoto: number;
  idCategoriaFoto: number;
  categoriaNome: string;
  titulo: string;
  descricao: string | null;
  urlFoto: string;
  urlMiniatura: string;
  dataFoto: Date;
  creditos: string | null;
  ativa: boolean;
}
