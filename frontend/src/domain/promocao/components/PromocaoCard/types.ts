import type { Promocao } from '../../types';

export interface PromocaoCardProps {
  promocao: Promocao;
  onClick?: (promocao: Promocao) => void;
}
