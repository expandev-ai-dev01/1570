import { useQuery } from '@tanstack/react-query';
import { categoriaService } from '../../services';
import type { UseCategoriaListReturn } from './types';

/**
 * @hook useCategoriaList
 * @summary Hook for fetching list of categories
 * @domain cardapio
 * @type domain-hook
 * @category data
 */
export const useCategoriaList = (): UseCategoriaListReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categorias'],
    queryFn: () => categoriaService.list(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    categorias: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
