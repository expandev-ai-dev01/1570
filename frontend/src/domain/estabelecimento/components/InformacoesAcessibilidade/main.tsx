import type { InformacoesAcessibilidadeProps } from './types';

/**
 * @component InformacoesAcessibilidade
 * @summary Displays accessibility information and resources
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const InformacoesAcessibilidade = ({ acessibilidade }: InformacoesAcessibilidadeProps) => {
  if (!acessibilidade || acessibilidade.recursos.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{acessibilidade.titulo}</h2>

      {acessibilidade.descricao && <p className="text-gray-700 mb-6">{acessibilidade.descricao}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {acessibilidade.recursos.map((recurso, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            {recurso.icone && <span className="text-2xl flex-shrink-0">{recurso.icone}</span>}
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{recurso.nome}</h3>
              {recurso.descricao && <p className="text-sm text-gray-600">{recurso.descricao}</p>}
            </div>
          </div>
        ))}
      </div>

      {acessibilidade.imagens && acessibilidade.imagens.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Galeria de Acessibilidade</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {acessibilidade.imagens.map((imagem, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={imagem}
                  alt={`Recurso de acessibilidade ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {acessibilidade.contato && (
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Contato para Questões de Acessibilidade
          </h3>
          <p className="text-gray-700">{acessibilidade.contato}</p>
        </div>
      )}
    </div>
  );
};
