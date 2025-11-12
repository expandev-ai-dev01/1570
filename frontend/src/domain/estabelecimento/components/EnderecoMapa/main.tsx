import type { EnderecoMapaProps } from './types';

/**
 * @component EnderecoMapa
 * @summary Displays address and interactive map
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const EnderecoMapa = ({ endereco }: EnderecoMapaProps) => {
  const enderecoCompleto = `${endereco.logradouro}, ${endereco.numero}${
    endereco.complemento ? ` - ${endereco.complemento}` : ''
  }, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${endereco.cep}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${endereco.latitude},${endereco.longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${endereco.latitude},${endereco.longitude}&navigate=yes`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Localização</h2>

        <div className="space-y-3 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Endereço</h3>
            <p className="text-gray-900">{enderecoCompleto}</p>
          </div>

          {endereco.pontoReferencia && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Ponto de Referência</h3>
              <p className="text-gray-600">{endereco.pontoReferencia}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mb-6">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center text-sm font-medium"
          >
            📍 Abrir no Google Maps
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors text-center text-sm font-medium"
          >
            🚗 Abrir no Waze
          </a>
        </div>
      </div>

      <div className="w-full h-96 bg-gray-200">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${endereco.latitude},${endereco.longitude}&zoom=15`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa do estabelecimento"
        />
      </div>
    </div>
  );
};
