import type { Foto } from '../../types';

export interface FotoSlideshowProps {
  fotos: Foto[];
  startIndex: number;
  isActive: boolean;
  onStop: () => void;
  interval?: number;
}
