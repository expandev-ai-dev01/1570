import { useState } from 'react';
import { cn } from '@/core/utils';
import type { PerguntasFrequentesProps } from './types';

/**
 * @component PerguntasFrequentes
 * @summary Displays FAQ with expandable answers
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const PerguntasFrequentes = ({ perguntas }: PerguntasFrequentesProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
    setExpandedIndex(null);
  };

  const categorias = Array.from(new Set(perguntas.map((p) => p.categoria).filter(Boolean)));
  const perguntasPorCategoria =
    categorias.length > 0
      ? categorias.reduce((acc, categoria) => {
          acc[categoria!] = perguntas
            .filter((p) => p.categoria === categoria)
            .sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
          return acc;
        }, {} as Record<string, typeof perguntas>)
      : { Geral: perguntas.sort((a, b) => (a.ordem || 0) - (b.ordem || 0)) };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Perguntas Frequentes</h2>
        <button onClick={handleExpandAll} className="text-sm text-blue-600 hover:text-blue-700">
          {expandAll ? 'Recolher Todas' : 'Expandir Todas'}
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(perguntasPorCategoria).map(([categoria, perguntasCategoria]) => (
          <div key={categoria}>
            {categorias.length > 0 && (
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{categoria}</h3>
            )}
            <div className="space-y-2">
              {perguntasCategoria.map((pergunta, index) => {
                const globalIndex = perguntas.indexOf(pergunta);
                const isExpanded = expandAll || expandedIndex === globalIndex;
                return (
                  <div
                    key={globalIndex}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => handleToggle(globalIndex)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{pergunta.pergunta}</span>
                      <span
                        className={cn(
                          'text-2xl text-gray-500 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      >
                        ▼
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 text-gray-700 whitespace-pre-line">
                        {pergunta.resposta}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
