import type { NovoSabor } from '../../types';

export interface UseNovoSaborListOptions {
  apenasDestaqueHome?: boolean;
  enabled?: boolean;
}

export interface UseNovoSaborListReturn {
  novosSabores: NovoSabor[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
