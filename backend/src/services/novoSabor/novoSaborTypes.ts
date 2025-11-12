/**
 * @summary Type definitions for novoSabor service
 */

/**
 * @interface NovoSaborListParams
 * @description Parameters for filtering new flavor list
 *
 * @property {boolean} [apenasDestaqueHome] - Filter only home highlighted new flavors
 */
export interface NovoSaborListParams {
  apenasDestaqueHome?: boolean;
}

/**
 * @interface NovoSaborListItem
 * @description New flavor list item with pastel details
 *
 * @property {number} idNovoSabor - New flavor identifier
 * @property {number} idPastel - Pastel identifier
 * @property {string} nomePastel - Pastel name
 * @property {string} descricaoPastel - Pastel description
 * @property {number} precoPastel - Pastel price
 * @property {string | null} imagemPastel - Pastel image URL
 * @property {string} categoriaNome - Category name
 * @property {Date} dataAdicao - Addition date
 * @property {number} periodoNovidade - Novelty period in days
 * @property {boolean} destaqueHome - Home highlight flag
 * @property {number} diasRestantes - Days remaining in novelty period
 */
export interface NovoSaborListItem {
  idNovoSabor: number;
  idPastel: number;
  nomePastel: string;
  descricaoPastel: string;
  precoPastel: number;
  imagemPastel: string | null;
  categoriaNome: string;
  dataAdicao: Date;
  periodoNovidade: number;
  destaqueHome: boolean;
  diasRestantes: number;
}
