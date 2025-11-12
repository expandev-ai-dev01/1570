import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { CertificacoesPremiosProps } from './types';
import type { Certificacao } from '../../types';

/**
 * @component CertificacoesPremios
 * @summary Displays certifications and awards
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const CertificacoesPremios = ({ certificacoes }: CertificacoesPremiosProps) => {
  const [selectedCertificacao, setSelectedCertificacao] = useState<Certificacao | null>(null);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (error: unknown) {
      return dateString;
    }
  };

  const certificacoesOrdenadas = [...certificacoes].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  const handleCertificacaoClick = (certificacao: Certificacao) => {
    if (certificacao.imagem) {
      setSelectedCertificacao(certificacao);
    }
  };

  const handleCloseModal = () => {
    setSelectedCertificacao(null);
  };

  if (certificacoes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Certificações e Prêmios</h2>

      <div className="space-y-4">
        {certificacoesOrdenadas.map((certificacao, index) => (
          <div
            key={index}
            onClick={() => handleCertificacaoClick(certificacao)}
            className={`flex gap-4 p-4 bg-gray-50 rounded-lg ${
              certificacao.imagem ? 'cursor-pointer hover:bg-gray-100' : ''
            } transition-colors`}
          >
            {certificacao.imagem && (
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                <img
                  src={certificacao.imagem}
                  alt={certificacao.nome}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{certificacao.nome}</h3>
              {certificacao.descricao && (
                <p className="text-sm text-gray-600 mb-2">{certificacao.descricao}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>📅 {formatDate(certificacao.data)}</span>
                {certificacao.entidadeCertificadora && (
                  <span>🏆 {certificacao.entidadeCertificadora}</span>
                )}
              </div>
              {certificacao.imagem && (
                <p className="text-xs text-blue-600 mt-2">Clique para ampliar</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCertificacao && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            aria-label="Fechar"
          >
            ×
          </button>
          <div className="max-w-4xl max-h-screen w-full h-full flex flex-col items-center justify-center">
            <img
              src={selectedCertificacao.imagem}
              alt={selectedCertificacao.nome}
              className="max-w-full max-h-full object-contain"
            />
            <div className="bg-black bg-opacity-70 text-white p-4 mt-4 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-semibold mb-2">{selectedCertificacao.nome}</h3>
              {selectedCertificacao.descricao && (
                <p className="text-sm text-gray-300 mb-2">{selectedCertificacao.descricao}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{formatDate(selectedCertificacao.data)}</span>
                {selectedCertificacao.entidadeCertificadora && (
                  <span>{selectedCertificacao.entidadeCertificadora}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
