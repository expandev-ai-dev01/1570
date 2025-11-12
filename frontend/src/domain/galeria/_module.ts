/**
 * @module galeria
 * @summary Domain module for photo gallery functionality
 * @domain functional
 * @dependencies react, react-query, axios
 * @version 1.0.0
 */

export * from './types';
export * from './services';
export * from './hooks';
export * from './components';

export const moduleMetadata = {
  name: 'galeria',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['CategoriaFotoCard', 'FotoGrid', 'FotoModal', 'FotoSlideshow', 'FotoFilters'],
  publicHooks: ['useCategoriaFotoList', 'useFotoList', 'useFotoDetail'],
  publicServices: ['categoriaFotoService', 'fotoService'],
  dependencies: {
    internal: ['@/core/lib', '@/core/utils', '@/core/components'],
    external: ['react', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: ['CategoriaFotoCard', 'FotoGrid', 'FotoModal', 'FotoSlideshow', 'FotoFilters'],
    hooks: ['useCategoriaFotoList', 'useFotoList', 'useFotoDetail'],
    services: ['categoriaFotoService', 'fotoService'],
    types: ['CategoriaFoto', 'Foto', 'FotoListParams'],
  },
} as const;
