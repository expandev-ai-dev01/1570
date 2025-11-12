import { useQuery } from '@tanstack/react-query';
import { fotoService } from '../../services';
import type { UseFotoListOptions, UseFotoListReturn } from './types';

/**
 * @hook useFotoList
 * @summary Hook for fetching list of photos with filters
 * @domain galeria
 * @type domain-hook
 * @category data
 */
export const useFotoList = (options: UseFotoListOptions = {}): UseFotoListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fotos', filters],
    queryFn: () => fotoService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    fotos: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
