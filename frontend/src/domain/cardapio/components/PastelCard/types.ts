import type { Pastel } from '../../types';

export interface PastelCardProps {
  pastel: Pastel;
  onClick?: (pastel: Pastel) => void;
}
