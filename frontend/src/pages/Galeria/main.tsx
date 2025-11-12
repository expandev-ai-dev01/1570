import { useState } from 'react';
import { useCategoriaFotoList, useFotoList } from '@/domain/galeria/hooks';
import {
  CategoriaFotoCard,
  FotoGrid,
  FotoModal,
  FotoSlideshow,
  FotoFilters,
} from '@/domain/galeria/components';
import type { FotoListParams, CategoriaFoto, Foto } from '@/domain/galeria/types';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { GaleriaPageProps } from './types';

/**
 * @page GaleriaPage
 * @summary Photo gallery page with categories, filters, and slideshow
 * @domain galeria
 * @type list-page
 * @category public
 *
 * @routing
 * - Path: /galeria
 * - Params: none
 * - Query: none
 * - Guards: none
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Category Selection, Filters, Photo Grid, Modal, Slideshow
 * - Navigation: Category cards, photo thumbnails
 *
 * @data
 * - Sources: CategoriaFoto API, Foto API
 * - Loading: Skeleton loading states
 * - Caching: 2-5 minutes stale time
 */
export const GaleriaPage = (props: GaleriaPageProps) => {
  const [selectedCategoria, setSelectedCategoria] = useState<number | undefined>(undefined);
  const [filters, setFilters] = useState<FotoListParams>({
    ordenacao: 'mais_recentes',
  });
  const [selectedFoto, setSelectedFoto] = useState<Foto | null>(null);
  const [currentFotoIndex, setCurrentFotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);

  const { categorias, isLoading: isLoadingCategorias } = useCategoriaFotoList();
  const { fotos, isLoading: isLoadingFotos } = useFotoList({
    filters: { ...filters, idCategoriaFoto: selectedCategoria },
  });

  const handleCategoriaClick = (categoria: CategoriaFoto) => {
    setSelectedCategoria(categoria.idCategoriaFoto);
  };

  const handleBackToCategorias = () => {
    setSelectedCategoria(undefined);
  };

  const handleFotoClick = (foto: Foto, index: number) => {
    setSelectedFoto(foto);
    setCurrentFotoIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFoto(null);
  };

  const handleNextFoto = () => {
    if (!fotos || currentFotoIndex >= fotos.length - 1) return;
    const nextIndex = currentFotoIndex + 1;
    setCurrentFotoIndex(nextIndex);
    setSelectedFoto(fotos[nextIndex]);
  };

  const handlePreviousFoto = () => {
    if (!fotos || currentFotoIndex <= 0) return;
    const prevIndex = currentFotoIndex - 1;
    setCurrentFotoIndex(prevIndex);
    setSelectedFoto(fotos[prevIndex]);
  };

  const handleStartSlideshow = () => {
    setIsModalOpen(false);
    setIsSlideshowActive(true);
  };

  const handleStopSlideshow = () => {
    setIsSlideshowActive(false);
  };

  if (isLoadingCategorias) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Galeria de Fotos</h1>
        <p className="text-lg text-gray-600">
          Conheça nossos pastéis, ambiente e momentos especiais
        </p>
      </div>

      {!selectedCategoria ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categorias</h2>
          {categorias && categorias.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorias.map((categoria) => (
                <CategoriaFotoCard
                  key={categoria.idCategoriaFoto}
                  categoria={categoria}
                  onClick={handleCategoriaClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Nenhuma categoria disponível no momento.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={handleBackToCategorias}
            className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← Voltar às Categorias
          </button>

          <div className="mb-6">
            <FotoFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {isLoadingFotos ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : fotos && fotos.length > 0 ? (
            <FotoGrid fotos={fotos} onFotoClick={handleFotoClick} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                Nenhuma foto encontrada com os filtros aplicados.
              </p>
            </div>
          )}
        </div>
      )}

      {fotos && (
        <>
          <FotoModal
            foto={selectedFoto}
            fotos={fotos}
            currentIndex={currentFotoIndex}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onNext={handleNextFoto}
            onPrevious={handlePreviousFoto}
            onStartSlideshow={handleStartSlideshow}
          />

          <FotoSlideshow
            fotos={fotos}
            startIndex={currentFotoIndex}
            isActive={isSlideshowActive}
            onStop={handleStopSlideshow}
          />
        </>
      )}
    </div>
  );
};

export default GaleriaPage;
