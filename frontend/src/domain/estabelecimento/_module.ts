/**
 * @module estabelecimento
 * @summary Domain module for establishment information functionality
 * @domain functional
 * @dependencies react, react-query, axios
 * @version 1.0.0
 */

export * from './services';
export * from './hooks';
export * from './components';

export const moduleMetadata = {
  name: 'estabelecimento',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: [
    'HorarioFuncionamento',
    'EnderecoMapa',
    'CanaisContato',
    'HistoriaEstabelecimento',
    'EquipeProprietarios',
    'PoliticasEstabelecimento',
    'CertificacoesPremios',
    'PerguntasFrequentes',
    'InformacoesAcessibilidade',
  ],
  publicHooks: ['useEstabelecimentoInfo'],
  publicServices: ['estabelecimentoService'],
  dependencies: {
    internal: ['@/core/lib', '@/core/utils', '@/core/components'],
    external: ['react', '@tanstack/react-query', 'axios', 'date-fns'],
    domains: [],
  },
  exports: {
    components: [
      'HorarioFuncionamento',
      'EnderecoMapa',
      'CanaisContato',
      'HistoriaEstabelecimento',
      'EquipeProprietarios',
      'PoliticasEstabelecimento',
      'CertificacoesPremios',
      'PerguntasFrequentes',
      'InformacoesAcessibilidade',
    ],
    hooks: ['useEstabelecimentoInfo'],
    services: ['estabelecimentoService'],
    types: [
      'EstabelecimentoInfo',
      'Endereco',
      'Contato',
      'MembroEquipe',
      'Certificacao',
      'PerguntaFrequente',
      'RecursoAcessibilidade',
    ],
  },
} as const;
