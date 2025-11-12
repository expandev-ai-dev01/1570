/**
 * @summary Type definitions for pastel service
 */

/**
 * @interface PastelListParams
 * @description Parameters for filtering and ordering pastel list
 *
 * @property {number} [idCategoria] - Filter by category ID
 * @property {number} [precoMin] - Minimum price filter
 * @property {number} [precoMax] - Maximum price filter
 * @property {string} [ingrediente] - Filter by ingredient
 * @property {string} [restricao] - Filter by dietary restriction
 * @property {boolean} [apenasDisponiveis] - Filter only available pastries
 * @property {string} [ordenacao] - Sort order
 */
export interface PastelListParams {
  idCategoria?: number;
  precoMin?: number;
  precoMax?: number;
  ingrediente?: string;
  restricao?: string;
  apenasDisponiveis?: boolean;
  ordenacao?: string;
}

/**
 * @interface PastelListItem
 * @description Pastel list item with basic information
 *
 * @property {number} idPastel - Pastel identifier
 * @property {number} idCategoria - Category identifier
 * @property {string} categoriaNome - Category name
 * @property {string} nome - Pastel name
 * @property {string} descricao - Pastel description
 * @property {number} preco - Pastel price
 * @property {string | null} imagemUrl - Image URL
 * @property {boolean} disponivel - Availability status
 * @property {boolean} destaque - Highlight status
 * @property {string[]} ingredientes - Ingredients list
 * @property {string[]} alergenicos - Allergens list
 * @property {object | null} infoNutricional - Nutritional information
 * @property {string[]} restricoes - Dietary restrictions
 * @property {string | null} motivoIndisponibilidade - Unavailability reason
 * @property {Date | null} previsaoDisponibilidade - Availability forecast
 */
export interface PastelListItem {
  idPastel: number;
  idCategoria: number;
  categoriaNome: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string | null;
  disponivel: boolean;
  destaque: boolean;
  ingredientes: string[];
  alergenicos: string[];
  infoNutricional: object | null;
  restricoes: string[];
  motivoIndisponibilidade: string | null;
  previsaoDisponibilidade: Date | null;
}

/**
 * @interface PastelDetail
 * @description Detailed pastel information
 *
 * @property {number} idPastel - Pastel identifier
 * @property {number} idCategoria - Category identifier
 * @property {string} categoriaNome - Category name
 * @property {string} nome - Pastel name
 * @property {string} descricao - Pastel description
 * @property {number} preco - Pastel price
 * @property {string | null} imagemUrl - Image URL
 * @property {boolean} disponivel - Availability status
 * @property {boolean} destaque - Highlight status
 * @property {string[]} ingredientes - Ingredients list
 * @property {string[]} alergenicos - Allergens list
 * @property {object | null} infoNutricional - Nutritional information
 * @property {string[]} restricoes - Dietary restrictions
 * @property {string | null} motivoIndisponibilidade - Unavailability reason
 * @property {Date | null} previsaoDisponibilidade - Availability forecast
 */
export interface PastelDetail {
  idPastel: number;
  idCategoria: number;
  categoriaNome: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string | null;
  disponivel: boolean;
  destaque: boolean;
  ingredientes: string[];
  alergenicos: string[];
  infoNutricional: object | null;
  restricoes: string[];
  motivoIndisponibilidade: string | null;
  previsaoDisponibilidade: Date | null;
}
