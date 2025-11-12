import type { CategoriaFoto } from '../../types';

export interface CategoriaFotoCardProps {
  categoria: CategoriaFoto;
  onClick?: (categoria: CategoriaFoto) => void;
}
