import type { CategoriaFoto } from '../../types';

export interface UseCategoriaFotoListReturn {
  categorias: CategoriaFoto[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
