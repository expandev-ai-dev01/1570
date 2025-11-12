export interface Promocao {
  idPromocao: number;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  categoria: 'diaria' | 'semanal' | 'sazonal' | 'data_comemorativa';
  desconto?: number;
  valorPromocional?: number;
  imagem: string;
  status: 'agendada' | 'ativa' | 'encerrada';
  termosCondicoes?: string;
  destaque: boolean;
}

export interface PromocaoListParams {
  status?: 'agendada' | 'ativa' | 'encerrada';
  categoria?: 'diaria' | 'semanal' | 'sazonal' | 'data_comemorativa';
  dataInicio?: string;
  dataFim?: string;
  apenasDestaque?: boolean;
}

export interface NovoSabor {
  idNovoSabor: number;
  idPastel: number;
  dataAdicao: string;
  periodoNovidade: number;
  destaqueHome: boolean;
  pastel: {
    idPastel: number;
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl?: string;
    disponivel: boolean;
  };
}
