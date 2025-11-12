import type { Pastel } from '../../types';

export interface UsePastelDetailOptions {
  id: number;
  enabled?: boolean;
}

export interface UsePastelDetailReturn {
  pastel: Pastel | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
