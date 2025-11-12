import { useState, useEffect } from 'react';
import type { FotoSlideshowProps } from './types';

/**
 * @component FotoSlideshow
 * @summary Automatic slideshow of photos
 * @domain galeria
 * @type domain-component
 * @category display
 */
export const FotoSlideshow = ({
  fotos,
  startIndex,
  isActive,
  onStop,
  interval = 5000,
}: FotoSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isActive || isPaused || fotos.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % fotos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, isPaused, fotos.length, interval]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;

      if (e.key === 'Escape') {
        onStop();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onStop]);

  if (!isActive || fotos.length === 0) return null;

  const currentFoto = fotos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button
        onClick={onStop}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
        aria-label="Parar slideshow"
      >
        ×
      </button>

      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all z-10"
      >
        {isPaused ? '▶ Retomar' : '⏸ Pausar'}
      </button>

      <div className="w-full h-full flex items-center justify-center p-8">
        <img
          key={currentFoto.idFoto}
          src={currentFoto.url}
          alt={currentFoto.titulo}
          className="max-w-full max-h-full object-contain animate-fade-in"
        />
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
        <p className="text-sm">
          {currentIndex + 1} / {fotos.length}
        </p>
      </div>
    </div>
  );
};
