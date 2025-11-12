import { useState } from 'react';
import type { FotoFiltersProps } from './types';

/**
 * @component FotoFilters
 * @summary Filters for photo list
 * @domain galeria
 * @type domain-component
 * @category filter
 */
export const FotoFilters = ({ filters, onFiltersChange }: FotoFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDataInicioChange = (value: string) => {
    const dataInicio = value || undefined;
    onFiltersChange({ ...filters, dataInicio });
  };

  const handleDataFimChange = (value: string) => {
    const dataFim = value || undefined;
    onFiltersChange({ ...filters, dataFim });
  };

  const handleOrdenacaoChange = (value: string) => {
    const ordenacao = value ? (value as 'mais_recentes' | 'mais_antigas') : undefined;
    onFiltersChange({ ...filters, ordenacao });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      ordenacao: 'mais_recentes',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {isExpanded ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
              <input
                type="date"
                value={filters.dataInicio || ''}
                onChange={(e) => handleDataInicioChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Final</label>
              <input
                type="date"
                value={filters.dataFim || ''}
                onChange={(e) => handleDataFimChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
            <select
              value={filters.ordenacao || 'mais_recentes'}
              onChange={(e) => handleOrdenacaoChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mais_recentes">Mais Recentes</option>
              <option value="mais_antigas">Mais Antigas</option>
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
