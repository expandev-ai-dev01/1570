import type { FotoListParams } from '../../types';

export interface FotoFiltersProps {
  filters: FotoListParams;
  onFiltersChange: (filters: FotoListParams) => void;
}
