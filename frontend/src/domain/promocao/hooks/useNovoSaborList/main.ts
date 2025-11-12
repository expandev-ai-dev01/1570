import { useQuery } from '@tanstack/react-query';
import { novoSaborService } from '../../services';
import type { UseNovoSaborListOptions, UseNovoSaborListReturn } from './types';

/**
 * @hook useNovoSaborList
 * @summary Hook for fetching list of new flavors
 * @domain promocao
 * @type domain-hook
 * @category data
 */
export const useNovoSaborList = (options: UseNovoSaborListOptions = {}): UseNovoSaborListReturn => {
  const { apenasDestaqueHome, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['novos-sabores', apenasDestaqueHome],
    queryFn: () => novoSaborService.list(apenasDestaqueHome),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    novosSabores: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
