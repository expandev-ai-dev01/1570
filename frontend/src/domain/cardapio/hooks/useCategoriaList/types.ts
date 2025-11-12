import type { Categoria } from '../../types';

export interface UseCategoriaListReturn {
  categorias: Categoria[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
