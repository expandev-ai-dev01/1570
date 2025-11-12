import { useQuery } from '@tanstack/react-query';
import { pastelService } from '../../services';
import type { UsePastelListOptions, UsePastelListReturn } from './types';

/**
 * @hook usePastelList
 * @summary Hook for fetching list of pastries with filters
 * @domain cardapio
 * @type domain-hook
 * @category data
 */
export const usePastelList = (options: UsePastelListOptions = {}): UsePastelListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['pasteis', filters],
    queryFn: () => pastelService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    pasteis: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
