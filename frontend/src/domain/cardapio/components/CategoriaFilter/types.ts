import type { Categoria } from '../../types';

export interface CategoriaFilterProps {
  categorias: Categoria[];
  selectedCategoriaId?: number;
  onSelectCategoria: (categoriaId?: number) => void;
}
