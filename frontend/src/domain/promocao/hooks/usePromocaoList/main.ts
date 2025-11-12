import { useQuery } from '@tanstack/react-query';
import { promocaoService } from '../../services';
import type { UsePromocaoListOptions, UsePromocaoListReturn } from './types';

/**
 * @hook usePromocaoList
 * @summary Hook for fetching list of promotions with filters
 * @domain promocao
 * @type domain-hook
 * @category data
 */
export const usePromocaoList = (options: UsePromocaoListOptions = {}): UsePromocaoListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['promocoes', filters],
    queryFn: () => promocaoService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    promocoes: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
