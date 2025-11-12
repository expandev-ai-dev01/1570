export interface Pastel {
  idPastel: number;
  nome: string;
  descricao: string;
  preco: number;
  categoriaId: number;
  imagemUrl?: string;
  disponivel: boolean;
  destaque: boolean;
  ingredientes: string[];
  alergenicos?: string[];
  infoNutricional?: {
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
  };
  restricoes?: string[];
}

export interface Categoria {
  idCategoria: number;
  nome: string;
  descricao?: string;
  icone?: string;
  ordem: number;
  totalPasteis: number;
}

export interface PastelListParams {
  idCategoria?: number;
  precoMin?: number;
  precoMax?: number;
  ingrediente?: string;
  restricao?: 'vegetariano' | 'vegano' | 'sem_gluten' | 'sem_lactose';
  apenasDisponiveis?: boolean;
  ordenacao?: 'preco_asc' | 'preco_desc' | 'nome_asc' | 'nome_desc' | 'popularidade';
}
