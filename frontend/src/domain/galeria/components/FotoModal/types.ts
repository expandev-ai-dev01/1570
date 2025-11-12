import type { Foto } from '../../types';

export interface FotoModalProps {
  foto: Foto | null;
  fotos: Foto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onStartSlideshow?: () => void;
}
