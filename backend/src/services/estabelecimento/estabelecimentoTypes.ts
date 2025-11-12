/**
 * @summary Type definitions for estabelecimento service
 */

/**
 * @interface EstabelecimentoInfo
 * @description Main establishment information
 */
export interface EstabelecimentoInfo {
  idEstabelecimento: number;
  nomeFantasia: string;
  razaoSocial: string | null;
  cnpj: string | null;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  pontoReferencia: string | null;
  latitude: number;
  longitude: number;
  telefoneFixo: string | null;
  telefoneCelular: string;
  whatsapp: string | null;
  email: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  youtube: string | null;
  tiktok: string | null;
  horarioAtendimentoContato: string;
  dataFundacao: Date;
  fundadores: string;
  tituloHistoria: string;
  textoHistoria: string;
  videoHistoria: string | null;
  marcosHistoricos: string | any[];
  tituloPoliticas: string;
  formasPagamento: string | any[];
  politicaDelivery: string | null;
  taxaEntrega: number | null;
  raioEntrega: number | null;
  tempoMedioEntrega: string | null;
  politicaCancelamento: string | null;
  politicaReembolso: string | null;
  valorPedidoMinimo: number | null;
  outrasPoliticas: string | any[];
  tituloAcessibilidade: string | null;
  descricaoAcessibilidade: string | null;
  recursosAcessibilidade: string | any[];
  contatoAcessibilidade: string | null;
}

/**
 * @interface HorarioFuncionamento
 * @description Operating hours by day of week
 */
export interface HorarioFuncionamento {
  idHorarioFuncionamento: number;
  diaSemana: string;
  horarioAbertura: string;
  horarioFechamento: string;
  statusFuncionamento: string;
  observacao: string | null;
}

/**
 * @interface Feriado
 * @description Holiday with special operating hours
 */
export interface Feriado {
  idFeriado: number;
  nome: string;
  data: Date;
  horarioAbertura: string | null;
  horarioFechamento: string | null;
  statusFuncionamento: string;
}

/**
 * @interface ImagemHistoria
 * @description Historical image
 */
export interface ImagemHistoria {
  idImagemHistoria: number;
  urlImagem: string;
  legenda: string | null;
  ordem: number;
}

/**
 * @interface MembroEquipe
 * @description Team member information
 */
export interface MembroEquipe {
  idMembroEquipe: number;
  nome: string;
  cargo: string;
  fotoUrl: string | null;
  biografia: string | null;
  destaqueProprietario: boolean;
  ordem: number;
}

/**
 * @interface Certificacao
 * @description Certification or award
 */
export interface Certificacao {
  idCertificacao: number;
  nome: string;
  descricao: string | null;
  dataCertificacao: Date;
  imagemUrl: string | null;
  entidadeCertificadora: string | null;
}

/**
 * @interface PerguntaFrequente
 * @description Frequently asked question
 */
export interface PerguntaFrequente {
  idPerguntaFrequente: number;
  pergunta: string;
  resposta: string;
  categoria: string | null;
  ordemExibicao: number;
}

/**
 * @interface ImagemAcessibilidade
 * @description Accessibility feature image
 */
export interface ImagemAcessibilidade {
  idImagemAcessibilidade: number;
  urlImagem: string;
  legenda: string | null;
  ordem: number;
}

/**
 * @interface EstabelecimentoCompleto
 * @description Complete establishment information with all related data
 */
export interface EstabelecimentoCompleto {
  estabelecimento: EstabelecimentoInfo;
  horarioFuncionamento: HorarioFuncionamento[];
  feriados: Feriado[];
  imagensHistoria: ImagemHistoria[];
  equipe: MembroEquipe[];
  certificacoes: Certificacao[];
  perguntasFrequentes: PerguntaFrequente[];
  imagensAcessibilidade: ImagemAcessibilidade[];
}
