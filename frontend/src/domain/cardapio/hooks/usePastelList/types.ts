import type { Pastel, PastelListParams } from '../../types';

export interface UsePastelListOptions {
  filters?: PastelListParams;
  enabled?: boolean;
}

export interface UsePastelListReturn {
  pasteis: Pastel[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
