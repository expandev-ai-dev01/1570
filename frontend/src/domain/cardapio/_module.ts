/**
 * @module cardapio
 * @summary Domain module for menu display functionality
 * @domain functional
 * @dependencies react, react-query, axios
 * @version 1.0.0
 */

export * from './types';
export * from './services';
export * from './hooks';
export * from './components';

export const moduleMetadata = {
  name: 'cardapio',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['PastelCard', 'CategoriaFilter', 'PastelFilters'],
  publicHooks: ['useCategoriaList', 'usePastelList', 'usePastelDetail'],
  publicServices: ['categoriaService', 'pastelService'],
  dependencies: {
    internal: ['@/core/lib', '@/core/utils', '@/core/components'],
    external: ['react', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: ['PastelCard', 'CategoriaFilter', 'PastelFilters'],
    hooks: ['useCategoriaList', 'usePastelList', 'usePastelDetail'],
    services: ['categoriaService', 'pastelService'],
    types: ['Pastel', 'Categoria', 'PastelListParams'],
  },
} as const;
