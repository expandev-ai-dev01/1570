import type { Promocao, PromocaoListParams } from '../../types';

export interface UsePromocaoListOptions {
  filters?: PromocaoListParams;
  enabled?: boolean;
}

export interface UsePromocaoListReturn {
  promocoes: Promocao[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
