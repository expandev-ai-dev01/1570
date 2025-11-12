export interface CategoriaFoto {
  idCategoriaFoto: number;
  nome: string;
  descricao?: string;
  ordem: number;
  quantidadeFotos: number;
  dataAtualizacao: string;
}

export interface Foto {
  idFoto: number;
  titulo: string;
  descricao?: string;
  url: string;
  urlMiniatura: string;
  data: string;
  creditos?: string;
  categoriaFotoId: number;
  categoriaNome: string;
}

export interface FotoListParams {
  idCategoriaFoto?: number;
  dataInicio?: string;
  dataFim?: string;
  ordenacao?: 'mais_recentes' | 'mais_antigas';
}
