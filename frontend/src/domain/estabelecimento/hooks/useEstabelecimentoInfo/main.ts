import { useQuery } from '@tanstack/react-query';
import { estabelecimentoService } from '../../services';
import type { UseEstabelecimentoInfoReturn } from './types';

/**
 * @hook useEstabelecimentoInfo
 * @summary Hook for fetching establishment information
 * @domain estabelecimento
 * @type domain-hook
 * @category data
 */
export const useEstabelecimentoInfo = (): UseEstabelecimentoInfoReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['estabelecimento'],
    queryFn: () => estabelecimentoService.get(),
    staleTime: 10 * 60 * 1000,
  });

  return {
    estabelecimento: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
