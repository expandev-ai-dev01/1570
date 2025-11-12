import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoriaList, usePastelList } from '@/domain/cardapio/hooks';
import { PastelCard, CategoriaFilter, PastelFilters } from '@/domain/cardapio/components';
import type { PastelListParams, Pastel } from '@/domain/cardapio/types';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { CardapioPageProps } from './types';

/**
 * @page CardapioPage
 * @summary Menu page displaying pastries with filtering and categorization
 * @domain cardapio
 * @type list-page
 * @category public
 *
 * @routing
 * - Path: /cardapio
 * - Params: none
 * - Query: none
 * - Guards: none
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Filters, Category Filter, Pastel Grid
 * - Navigation: Category tabs, filter panel
 *
 * @data
 * - Sources: Categoria API, Pastel API
 * - Loading: Skeleton loading states
 * - Caching: 2-5 minutes stale time
 */
export const CardapioPage = (props: CardapioPageProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<PastelListParams>({
    apenasDisponiveis: true,
    ordenacao: 'nome_asc',
  });

  const { categorias, isLoading: isLoadingCategorias } = useCategoriaList();
  const { pasteis, isLoading: isLoadingPasteis } = usePastelList({ filters });

  const handleCategoriaSelect = (categoriaId?: number) => {
    setFilters((prev) => ({ ...prev, idCategoria: categoriaId }));
  };

  const handlePastelClick = (pastel: Pastel) => {
    navigate(`/cardapio/${pastel.idPastel}`);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Nosso Cardápio</h1>
        <p className="text-lg text-gray-600">
          Conheça todos os sabores disponíveis em nossa pastelaria
        </p>
      </div>

      {categorias && categorias.length > 0 && (
        <div className="mb-6">
          <CategoriaFilter
            categorias={categorias}
            selectedCategoriaId={filters.idCategoria}
            onSelectCategoria={handleCategoriaSelect}
          />
        </div>
      )}

      <div className="mb-6">
        <PastelFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {isLoadingPasteis ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : pasteis && pasteis.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pasteis.map((pastel) => (
            <PastelCard key={pastel.idPastel} pastel={pastel} onClick={handlePastelClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            Nenhum pastel encontrado com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
};

export default CardapioPage;
