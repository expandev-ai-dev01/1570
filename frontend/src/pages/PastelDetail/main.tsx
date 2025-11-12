import { useParams, useNavigate } from 'react-router-dom';
import { usePastelDetail } from '@/domain/cardapio/hooks';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { PastelDetailPageProps } from './types';

/**
 * @page PastelDetailPage
 * @summary Detailed view of a single pastel
 * @domain cardapio
 * @type detail-page
 * @category public
 *
 * @routing
 * - Path: /cardapio/:id
 * - Params: { id: string }
 * - Query: none
 * - Guards: none
 */
export const PastelDetailPage = (props: PastelDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pastelId = id ? parseInt(id, 10) : 0;
  const { pastel, isLoading, error } = usePastelDetail({ id: pastelId, enabled: pastelId > 0 });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !pastel) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pastel não encontrado</h2>
          <button
            onClick={() => navigate('/cardapio')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Voltar ao Cardápio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/cardapio')}
        className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
      >
        ← Voltar ao Cardápio
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pastel.imagemUrl && (
            <div className="aspect-square w-full overflow-hidden bg-gray-200">
              <img
                src={pastel.imagemUrl}
                alt={pastel.nome}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{pastel.nome}</h1>
              {pastel.destaque && (
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded">
                  Destaque
                </span>
              )}
            </div>

            <p className="text-lg text-gray-600 mb-6">{pastel.descricao}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(pastel.preco)}</span>
              {!pastel.disponivel && (
                <span className="ml-4 text-lg text-red-600 font-medium">Indisponível</span>
              )}
            </div>

            {pastel.ingredientes && pastel.ingredientes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingredientes</h3>
                <ul className="list-disc list-inside space-y-1">
                  {pastel.ingredientes.map((ingrediente, index) => (
                    <li key={index} className="text-gray-700">
                      {ingrediente}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pastel.restricoes && pastel.restricoes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Restrições Alimentares</h3>
                <div className="flex flex-wrap gap-2">
                  {pastel.restricoes.map((restricao) => (
                    <span
                      key={restricao}
                      className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded"
                    >
                      {restricao}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {pastel.alergenicos && pastel.alergenicos.length > 0 && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
                <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  ⚠️ Alerta de Alérgenos
                </h3>
                <p className="text-orange-800">
                  Este pastel contém: {pastel.alergenicos.join(', ')}
                </p>
              </div>
            )}

            {pastel.infoNutricional && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Informações Nutricionais
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Calorias</span>
                    <p className="text-lg font-medium text-gray-900">
                      {pastel.infoNutricional.calorias} kcal
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Proteínas</span>
                    <p className="text-lg font-medium text-gray-900">
                      {pastel.infoNutricional.proteinas}g
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Carboidratos</span>
                    <p className="text-lg font-medium text-gray-900">
                      {pastel.infoNutricional.carboidratos}g
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Gorduras</span>
                    <p className="text-lg font-medium text-gray-900">
                      {pastel.infoNutricional.gorduras}g
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastelDetailPage;
