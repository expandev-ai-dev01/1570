/**
 * @summary Type definitions for promocao service
 */

/**
 * @interface PromocaoListParams
 * @description Parameters for filtering and ordering promotion list
 *
 * @property {string} [status] - Filter by promotion status
 * @property {string} [categoria] - Filter by promotion category
 * @property {string} [dataInicio] - Start date for date range filter
 * @property {string} [dataFim] - End date for date range filter
 * @property {boolean} [apenasDestaque] - Filter only featured promotions
 */
export interface PromocaoListParams {
  status?: string;
  categoria?: string;
  dataInicio?: string;
  dataFim?: string;
  apenasDestaque?: boolean;
}

/**
 * @interface PromocaoListItem
 * @description Promotion list item with basic information
 *
 * @property {number} idPromocao - Promotion identifier
 * @property {string} titulo - Promotion title
 * @property {string} descricao - Promotion description
 * @property {Date} dataInicio - Start date
 * @property {Date} dataTermino - End date
 * @property {string} categoria - Promotion category
 * @property {number | null} desconto - Discount percentage
 * @property {number | null} valorPromocional - Promotional value
 * @property {string} imagemUrl - Image URL
 * @property {string} status - Promotion status
 * @property {string | null} termosCondicoes - Terms and conditions
 * @property {boolean} destaque - Featured flag
 * @property {number | null} diasRestantes - Days remaining
 */
export interface PromocaoListItem {
  idPromocao: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataTermino: Date;
  categoria: string;
  desconto: number | null;
  valorPromocional: number | null;
  imagemUrl: string;
  status: string;
  termosCondicoes: string | null;
  destaque: boolean;
  diasRestantes: number | null;
}

/**
 * @interface PromocaoDetail
 * @description Detailed promotion information
 *
 * @property {number} idPromocao - Promotion identifier
 * @property {string} titulo - Promotion title
 * @property {string} descricao - Promotion description
 * @property {Date} dataInicio - Start date
 * @property {Date} dataTermino - End date
 * @property {string} categoria - Promotion category
 * @property {number | null} desconto - Discount percentage
 * @property {number | null} valorPromocional - Promotional value
 * @property {string} imagemUrl - Image URL
 * @property {string} status - Promotion status
 * @property {string | null} termosCondicoes - Terms and conditions
 * @property {boolean} destaque - Featured flag
 * @property {number | null} diasRestantes - Days remaining
 * @property {Date} dataCriacao - Creation date
 * @property {Date} dataAtualizacao - Last update date
 */
export interface PromocaoDetail {
  idPromocao: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataTermino: Date;
  categoria: string;
  desconto: number | null;
  valorPromocional: number | null;
  imagemUrl: string;
  status: string;
  termosCondicoes: string | null;
  destaque: boolean;
  diasRestantes: number | null;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
