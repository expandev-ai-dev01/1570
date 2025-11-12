import { useQuery } from '@tanstack/react-query';
import { pastelService } from '../../services';
import type { UsePastelDetailOptions, UsePastelDetailReturn } from './types';

/**
 * @hook usePastelDetail
 * @summary Hook for fetching single pastel details
 * @domain cardapio
 * @type domain-hook
 * @category data
 */
export const usePastelDetail = (options: UsePastelDetailOptions): UsePastelDetailReturn => {
  const { id, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['pastel', id],
    queryFn: () => pastelService.getById(id),
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  return {
    pastel: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
