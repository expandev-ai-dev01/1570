import type { EstabelecimentoInfo } from '../../types';

export interface UseEstabelecimentoInfoReturn {
  estabelecimento: EstabelecimentoInfo | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
