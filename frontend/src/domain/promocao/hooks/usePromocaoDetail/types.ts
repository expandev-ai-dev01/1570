import type { Promocao } from '../../types';

export interface UsePromocaoDetailOptions {
  id: number;
  enabled?: boolean;
}

export interface UsePromocaoDetailReturn {
  promocao: Promocao | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
