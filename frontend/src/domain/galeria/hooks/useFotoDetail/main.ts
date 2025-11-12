import { useQuery } from '@tanstack/react-query';
import { fotoService } from '../../services';
import type { UseFotoDetailOptions, UseFotoDetailReturn } from './types';

/**
 * @hook useFotoDetail
 * @summary Hook for fetching single photo details
 * @domain galeria
 * @type domain-hook
 * @category data
 */
export const useFotoDetail = (options: UseFotoDetailOptions): UseFotoDetailReturn => {
  const { id, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['foto', id],
    queryFn: () => fotoService.getById(id),
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  return {
    foto: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
