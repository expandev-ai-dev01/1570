/**
 * @module promocao
 * @summary Domain module for promotions and new flavors functionality
 * @domain functional
 * @dependencies react, react-query, axios, date-fns
 * @version 1.0.0
 */

export * from './types';
export * from './services';
export * from './hooks';
export * from './components';

export const moduleMetadata = {
  name: 'promocao',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: [
    'PromocaoCard',
    'PromocaoFilters',
    'PromocaoCountdown',
    'NovoSaborCard',
    'NovoSaborList',
  ],
  publicHooks: ['usePromocaoList', 'usePromocaoDetail', 'useNovoSaborList'],
  publicServices: ['promocaoService', 'novoSaborService'],
  dependencies: {
    internal: ['@/core/lib', '@/core/utils', '@/core/components'],
    external: ['react', '@tanstack/react-query', 'axios', 'date-fns'],
    domains: [],
  },
  exports: {
    components: [
      'PromocaoCard',
      'PromocaoFilters',
      'PromocaoCountdown',
      'NovoSaborCard',
      'NovoSaborList',
    ],
    hooks: ['usePromocaoList', 'usePromocaoDetail', 'useNovoSaborList'],
    services: ['promocaoService', 'novoSaborService'],
    types: ['Promocao', 'PromocaoListParams', 'NovoSabor'],
  },
} as const;
