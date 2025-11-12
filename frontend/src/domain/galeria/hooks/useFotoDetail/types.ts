import type { Foto } from '../../types';

export interface UseFotoDetailOptions {
  id: number;
  enabled?: boolean;
}

export interface UseFotoDetailReturn {
  foto: Foto | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
