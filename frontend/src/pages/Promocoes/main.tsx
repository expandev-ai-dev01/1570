import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePromocaoList, useNovoSaborList } from '@/domain/promocao/hooks';
import { PromocaoCard, PromocaoFilters, NovoSaborCard } from '@/domain/promocao/components';
import type { PromocaoListParams, Promocao, NovoSabor } from '@/domain/promocao/types';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { PromocoesPageProps } from './types';

/**
 * @page PromocoesPage
 * @summary Promotions and new flavors page
 * @domain promocao
 * @type list-page
 * @category public
 *
 * @routing
 * - Path: /promocoes
 * - Params: none
 * - Query: none
 * - Guards: none
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, New Flavors, Filters, Promotions Grid
 * - Navigation: Promotion cards, new flavor cards
 *
 * @data
 * - Sources: Promocao API, NovoSabor API
 * - Loading: Skeleton loading states
 * - Caching: 2 minutes stale time
 */
export const PromocoesPage = (props: PromocoesPageProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<PromocaoListParams>({
    status: 'ativa',
  });

  const { promocoes, isLoading: isLoadingPromocoes } = usePromocaoList({ filters });
  const { novosSabores, isLoading: isLoadingNovosSabores } = useNovoSaborList({
    apenasDestaqueHome: true,
  });

  const handlePromocaoClick = (promocao: Promocao) => {
    navigate(`/promocoes/${promocao.idPromocao}`);
  };

  const handleNovoSaborClick = (novoSabor: NovoSabor) => {
    navigate(`/cardapio/${novoSabor.pastel.idPastel}`);
  };

  const promocoesDestaque = promocoes?.filter((p) => p.destaque) || [];
  const promocoesRegulares = promocoes?.filter((p) => !p.destaque) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Promoções e Novidades</h1>
        <p className="text-lg text-gray-600">
          Confira nossas promoções especiais e os novos sabores adicionados ao cardápio
        </p>
      </div>

      {novosSabores && novosSabores.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Novos Sabores</h2>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full">
              ✨ NOVO
            </span>
          </div>
          {isLoadingNovosSabores ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {novosSabores.map((novoSabor) => (
                <NovoSaborCard
                  key={novoSabor.idNovoSabor}
                  novoSabor={novoSabor}
                  onClick={handleNovoSaborClick}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Promoções</h2>

        <div className="mb-6">
          <PromocaoFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {isLoadingPromocoes ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : promocoes && promocoes.length > 0 ? (
          <div className="space-y-12">
            {promocoesDestaque.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span>⭐</span>
                  <span>Promoções em Destaque</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {promocoesDestaque.map((promocao) => (
                    <PromocaoCard
                      key={promocao.idPromocao}
                      promocao={promocao}
                      onClick={handlePromocaoClick}
                    />
                  ))}
                </div>
              </div>
            )}

            {promocoesRegulares.length > 0 && (
              <div>
                {promocoesDestaque.length > 0 && (
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Outras Promoções</h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {promocoesRegulares.map((promocao) => (
                    <PromocaoCard
                      key={promocao.idPromocao}
                      promocao={promocao}
                      onClick={handlePromocaoClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Nenhuma promoção encontrada com os filtros aplicados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PromocoesPage;
