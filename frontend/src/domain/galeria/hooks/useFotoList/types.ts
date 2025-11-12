import type { Foto, FotoListParams } from '../../types';

export interface UseFotoListOptions {
  filters?: FotoListParams;
  enabled?: boolean;
}

export interface UseFotoListReturn {
  fotos: Foto[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
