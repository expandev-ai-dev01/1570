import { useQuery } from '@tanstack/react-query';
import { promocaoService } from '../../services';
import type { UsePromocaoDetailOptions, UsePromocaoDetailReturn } from './types';

/**
 * @hook usePromocaoDetail
 * @summary Hook for fetching single promotion details
 * @domain promocao
 * @type domain-hook
 * @category data
 */
export const usePromocaoDetail = (options: UsePromocaoDetailOptions): UsePromocaoDetailReturn => {
  const { id, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['promocao', id],
    queryFn: () => promocaoService.getById(id),
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  return {
    promocao: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
