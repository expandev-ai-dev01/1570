import type { FotoGridProps } from './types';

/**
 * @component FotoGrid
 * @summary Grid layout for displaying photo thumbnails
 * @domain galeria
 * @type domain-component
 * @category display
 */
export const FotoGrid = ({ fotos, onFotoClick }: FotoGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {fotos.map((foto, index) => (
        <div
          key={foto.idFoto}
          onClick={() => onFotoClick?.(foto, index)}
          className="aspect-square overflow-hidden rounded-lg bg-gray-200 cursor-pointer group relative"
        >
          <img
            src={foto.urlMiniatura}
            alt={foto.titulo}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end p-3">
            <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {foto.titulo}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
