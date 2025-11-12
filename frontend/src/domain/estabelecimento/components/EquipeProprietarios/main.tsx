import { useState } from 'react';
import type { EquipeProprietariosProps } from './types';
import type { MembroEquipe } from '../../types';

/**
 * @component EquipeProprietarios
 * @summary Displays team members and owners
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const EquipeProprietarios = ({ equipe }: EquipeProprietariosProps) => {
  const [selectedMembro, setSelectedMembro] = useState<MembroEquipe | null>(null);

  const proprietarios = equipe.filter((m) => m.proprietario);
  const outrosMembros = equipe.filter((m) => !m.proprietario);

  const handleMembroClick = (membro: MembroEquipe) => {
    if (membro.biografia) {
      setSelectedMembro(membro);
    }
  };

  const handleCloseModal = () => {
    setSelectedMembro(null);
  };

  const renderMembro = (membro: MembroEquipe) => (
    <div
      key={membro.nome}
      onClick={() => handleMembroClick(membro)}
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${
        membro.biografia ? 'cursor-pointer' : ''
      }`}
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-200">
        {membro.foto ? (
          <img
            src={membro.foto}
            alt={membro.nome}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-6xl text-gray-500">👤</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{membro.nome}</h3>
        <p className="text-sm text-gray-600">{membro.cargo}</p>
        {membro.biografia && (
          <p className="text-xs text-blue-600 mt-2">Clique para ver biografia</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Nossa Equipe</h2>

      {proprietarios.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Proprietários</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proprietarios.map(renderMembro)}
          </div>
        </div>
      )}

      {outrosMembros.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Equipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outrosMembros.map(renderMembro)}
          </div>
        </div>
      )}

      {selectedMembro && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {selectedMembro.foto ? (
                  <img
                    src={selectedMembro.foto}
                    alt={selectedMembro.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="text-4xl text-gray-500">👤</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedMembro.nome}</h3>
                <p className="text-lg text-gray-600">{selectedMembro.cargo}</p>
                {selectedMembro.proprietario && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mt-2">
                    Proprietário
                  </span>
                )}
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            {selectedMembro.biografia && (
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{selectedMembro.biografia}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
