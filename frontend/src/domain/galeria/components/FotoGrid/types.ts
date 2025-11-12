import type { Foto } from '../../types';

export interface FotoGridProps {
  fotos: Foto[];
  onFotoClick?: (foto: Foto, index: number) => void;
}
