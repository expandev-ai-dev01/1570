import type { NovoSabor } from '../../types';

export interface NovoSaborCardProps {
  novoSabor: NovoSabor;
  onClick?: (novoSabor: NovoSabor) => void;
}
