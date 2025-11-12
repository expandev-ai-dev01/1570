export interface HorarioFuncionamento {
  diaSemana: string;
  horarioAbertura: string;
  horarioFechamento: string;
  statusFuncionamento: 'Aberto' | 'Fechado' | 'Horário especial';
  observacao?: string;
}

export interface Feriado {
  nome: string;
  data: string;
  horarioAbertura?: string;
  horarioFechamento?: string;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  pontoReferencia?: string;
  latitude: number;
  longitude: number;
}

export interface Contato {
  telefoneFixo?: string;
  telefoneCelular: string;
  whatsapp?: string;
  email: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  horarioAtendimento: string;
}

export interface ImagemHistoria {
  url: string;
  legenda?: string;
}

export interface MarcoHistorico {
  data: string;
  descricao: string;
}

export interface Historia {
  titulo: string;
  texto: string;
  dataFundacao: string;
  fundadores: string;
  imagens?: ImagemHistoria[];
  video?: string;
  marcosHistoricos?: MarcoHistorico[];
}

export interface MembroEquipe {
  nome: string;
  cargo: string;
  foto?: string;
  biografia?: string;
  proprietario: boolean;
}

export interface FormaPagamento {
  nome: string;
  icone?: string;
}

export interface Politicas {
  formasPagamento: FormaPagamento[];
  politicaDelivery?: string;
  taxaEntrega?: number;
  raioEntrega?: number;
  tempoMedioEntrega?: string;
  politicaCancelamento?: string;
  politicaReembolso?: string;
  valorPedidoMinimo?: number;
  outrasPoliticas?: Array<{ titulo: string; descricao: string }>;
}

export interface Certificacao {
  nome: string;
  descricao?: string;
  data: string;
  imagem?: string;
  entidadeCertificadora?: string;
}

export interface PerguntaFrequente {
  pergunta: string;
  resposta: string;
  categoria?: string;
  ordem?: number;
}

export interface RecursoAcessibilidade {
  nome: string;
  descricao?: string;
  icone?: string;
}

export interface Acessibilidade {
  titulo: string;
  descricao?: string;
  recursos: RecursoAcessibilidade[];
  imagens?: string[];
  contato?: string;
}

export interface EstabelecimentoInfo {
  nome: string;
  descricao?: string;
  horarioFuncionamento: HorarioFuncionamento[];
  feriados?: Feriado[];
  endereco: Endereco;
  contato: Contato;
  historia: Historia;
  equipe: MembroEquipe[];
  politicas: Politicas;
  certificacoes?: Certificacao[];
  perguntasFrequentes: PerguntaFrequente[];
  acessibilidade?: Acessibilidade;
}
