import { useState } from 'react';
import type { PromocaoFiltersProps } from './types';

/**
 * @component PromocaoFilters
 * @summary Filters for promotion list
 * @domain promocao
 * @type domain-component
 * @category filter
 */
export const PromocaoFilters = ({ filters, onFiltersChange }: PromocaoFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (value: string) => {
    const status = value ? (value as 'agendada' | 'ativa' | 'encerrada') : undefined;
    onFiltersChange({ ...filters, status });
  };

  const handleCategoriaChange = (value: string) => {
    const categoria = value
      ? (value as 'diaria' | 'semanal' | 'sazonal' | 'data_comemorativa')
      : undefined;
    onFiltersChange({ ...filters, categoria });
  };

  const handleDataInicioChange = (value: string) => {
    const dataInicio = value || undefined;
    onFiltersChange({ ...filters, dataInicio });
  };

  const handleDataFimChange = (value: string) => {
    const dataFim = value || undefined;
    onFiltersChange({ ...filters, dataFim });
  };

  const handleApenasDestaqueChange = (checked: boolean) => {
    onFiltersChange({ ...filters, apenasDestaque: checked });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="agendada">Em Breve</option>
              <option value="ativa">Ativas</option>
              <option value="encerrada">Encerradas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={filters.categoria || ''}
              onChange={(e) => handleCategoriaChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              <option value="diaria">Promoção Diária</option>
              <option value="semanal">Promoção Semanal</option>
              <option value="sazonal">Promoção Sazonal</option>
              <option value="data_comemorativa">Data Comemorativa</option>
            </select>
          </div>

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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="apenasDestaque"
              checked={filters.apenasDestaque || false}
              onChange={(e) => handleApenasDestaqueChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="apenasDestaque" className="ml-2 text-sm text-gray-700">
              Apenas promoções em destaque
            </label>
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
