import { useQuery } from '@tanstack/react-query';
import { categoriaFotoService } from '../../services';
import type { UseCategoriaFotoListReturn } from './types';

/**
 * @hook useCategoriaFotoList
 * @summary Hook for fetching list of photo categories
 * @domain galeria
 * @type domain-hook
 * @category data
 */
export const useCategoriaFotoList = (): UseCategoriaFotoListReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categorias-foto'],
    queryFn: () => categoriaFotoService.list(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    categorias: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
