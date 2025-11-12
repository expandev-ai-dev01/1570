import type { PromocaoListParams } from '../../types';

export interface PromocaoFiltersProps {
  filters: PromocaoListParams;
  onFiltersChange: (filters: PromocaoListParams) => void;
}
