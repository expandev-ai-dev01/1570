import type { PastelListParams } from '../../types';

export interface PastelFiltersProps {
  filters: PastelListParams;
  onFiltersChange: (filters: PastelListParams) => void;
}
