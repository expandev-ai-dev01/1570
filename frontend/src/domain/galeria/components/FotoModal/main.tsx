import { useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { FotoModalProps } from './types';

/**
 * @component FotoModal
 * @summary Modal for displaying enlarged photo with navigation
 * @domain galeria
 * @type domain-component
 * @category display
 */
export const FotoModal = ({
  foto,
  fotos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  onStartSlideshow,
}: FotoModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen || !foto) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (error: unknown) {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
        aria-label="Fechar"
      >
        ×
      </button>

      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="absolute left-4 text-white text-4xl hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Anterior"
      >
        ‹
      </button>

      <button
        onClick={onNext}
        disabled={currentIndex === fotos.length - 1}
        className="absolute right-4 text-white text-4xl hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Próxima"
      >
        ›
      </button>

      <div className="max-w-6xl max-h-screen w-full h-full flex flex-col items-center justify-center p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          <img src={foto.url} alt={foto.titulo} className="max-w-full max-h-full object-contain" />
        </div>

        <div className="bg-black bg-opacity-70 text-white p-4 mt-4 rounded-lg max-w-2xl w-full">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold">{foto.titulo}</h3>
            <span className="text-sm text-gray-300">
              {currentIndex + 1} / {fotos.length}
            </span>
          </div>

          {foto.descricao && <p className="text-sm text-gray-300 mb-2">{foto.descricao}</p>}

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{formatDate(foto.data)}</span>
            {foto.creditos && <span>Foto: {foto.creditos}</span>}
          </div>

          {onStartSlideshow && (
            <button
              onClick={onStartSlideshow}
              className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Iniciar Slideshow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
