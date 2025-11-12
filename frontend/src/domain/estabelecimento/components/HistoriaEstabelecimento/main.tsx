import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { HistoriaEstabelecimentoProps } from './types';

/**
 * @component HistoriaEstabelecimento
 * @summary Displays establishment history with timeline
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const HistoriaEstabelecimento = ({ historia }: HistoriaEstabelecimentoProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (error: unknown) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{historia.titulo}</h2>

      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Data de Fundação</h3>
            <p className="text-lg font-medium text-gray-900">{formatDate(historia.dataFundacao)}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Fundadores</h3>
            <p className="text-lg font-medium text-gray-900">{historia.fundadores}</p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none mb-6">
        <div className="text-gray-700 whitespace-pre-line">{historia.texto}</div>
      </div>

      {historia.imagens && historia.imagens.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Galeria Histórica</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {historia.imagens.map((imagem, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={imagem.url}
                  alt={imagem.legenda || `Imagem histórica ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {imagem.legenda && <p className="text-xs text-gray-600 mt-2">{imagem.legenda}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {historia.video && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vídeo</h3>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src={historia.video}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Vídeo da história"
            />
          </div>
        </div>
      )}

      {historia.marcosHistoricos && historia.marcosHistoricos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Linha do Tempo</h3>
          <div className="space-y-4">
            {historia.marcosHistoricos.map((marco, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full" />
                  {index < historia.marcosHistoricos!.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-sm font-semibold text-blue-600 mb-1">
                    {formatDate(marco.data)}
                  </p>
                  <p className="text-gray-700">{marco.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
