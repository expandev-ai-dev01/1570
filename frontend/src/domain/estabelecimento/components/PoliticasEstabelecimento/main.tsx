import type { PoliticasEstabelecimentoProps } from './types';

/**
 * @component PoliticasEstabelecimento
 * @summary Displays establishment policies
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const PoliticasEstabelecimento = ({ politicas }: PoliticasEstabelecimentoProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Políticas do Estabelecimento</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Formas de Pagamento</h3>
          <div className="flex flex-wrap gap-3">
            {politicas.formasPagamento.map((forma, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
                {forma.icone && <span className="text-xl">{forma.icone}</span>}
                <span className="text-sm font-medium text-gray-900">{forma.nome}</span>
              </div>
            ))}
          </div>
        </div>

        {politicas.politicaDelivery && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Política de Delivery</h3>
            <p className="text-gray-700 mb-4">{politicas.politicaDelivery}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {politicas.taxaEntrega !== undefined && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Taxa de Entrega</h4>
                  <p className="text-lg font-medium text-gray-900">
                    {formatCurrency(politicas.taxaEntrega)}
                  </p>
                </div>
              )}
              {politicas.raioEntrega !== undefined && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Raio de Entrega</h4>
                  <p className="text-lg font-medium text-gray-900">{politicas.raioEntrega} km</p>
                </div>
              )}
              {politicas.tempoMedioEntrega && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Tempo Médio</h4>
                  <p className="text-lg font-medium text-gray-900">{politicas.tempoMedioEntrega}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {politicas.valorPedidoMinimo !== undefined && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pedido Mínimo</h3>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(politicas.valorPedidoMinimo)}
            </p>
          </div>
        )}

        {politicas.politicaCancelamento && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Política de Cancelamento</h3>
            <p className="text-gray-700">{politicas.politicaCancelamento}</p>
          </div>
        )}

        {politicas.politicaReembolso && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Política de Reembolso</h3>
            <p className="text-gray-700">{politicas.politicaReembolso}</p>
          </div>
        )}

        {politicas.outrasPoliticas && politicas.outrasPoliticas.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Outras Políticas</h3>
            <div className="space-y-4">
              {politicas.outrasPoliticas.map((politica, index) => (
                <div key={index}>
                  <h4 className="text-md font-semibold text-gray-900 mb-1">{politica.titulo}</h4>
                  <p className="text-gray-700">{politica.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
