import { useState } from 'react';
import type { PastelFiltersProps } from './types';

/**
 * @component PastelFilters
 * @summary Advanced filters for pastel list
 * @domain cardapio
 * @type domain-component
 * @category filter
 */
export const PastelFilters = ({ filters, onFiltersChange }: PastelFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePrecoMinChange = (value: string) => {
    const precoMin = value ? parseFloat(value) : undefined;
    onFiltersChange({ ...filters, precoMin });
  };

  const handlePrecoMaxChange = (value: string) => {
    const precoMax = value ? parseFloat(value) : undefined;
    onFiltersChange({ ...filters, precoMax });
  };

  const handleIngredienteChange = (value: string) => {
    const ingrediente = value.length >= 3 ? value : undefined;
    onFiltersChange({ ...filters, ingrediente });
  };

  const handleRestricaoChange = (value: string) => {
    const restricao = value
      ? (value as 'vegetariano' | 'vegano' | 'sem_gluten' | 'sem_lactose')
      : undefined;
    onFiltersChange({ ...filters, restricao });
  };

  const handleOrdenacaoChange = (value: string) => {
    const ordenacao = value
      ? (value as 'preco_asc' | 'preco_desc' | 'nome_asc' | 'nome_desc' | 'popularidade')
      : undefined;
    onFiltersChange({ ...filters, ordenacao });
  };

  const handleApenasDisponiveisChange = (checked: boolean) => {
    onFiltersChange({ ...filters, apenasDisponiveis: checked });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      apenasDisponiveis: true,
      ordenacao: 'nome_asc',
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço Mínimo</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.precoMin || ''}
                onChange={(e) => handlePrecoMinChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço Máximo</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.precoMax || ''}
                onChange={(e) => handlePrecoMaxChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingrediente</label>
            <input
              type="text"
              value={filters.ingrediente || ''}
              onChange={(e) => handleIngredienteChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar por ingrediente (mín. 3 caracteres)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restrição Alimentar
            </label>
            <select
              value={filters.restricao || ''}
              onChange={(e) => handleRestricaoChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              <option value="vegetariano">Vegetariano</option>
              <option value="vegano">Vegano</option>
              <option value="sem_gluten">Sem Glúten</option>
              <option value="sem_lactose">Sem Lactose</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
            <select
              value={filters.ordenacao || 'nome_asc'}
              onChange={(e) => handleOrdenacaoChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="nome_asc">Nome (A-Z)</option>
              <option value="nome_desc">Nome (Z-A)</option>
              <option value="preco_asc">Menor Preço</option>
              <option value="preco_desc">Maior Preço</option>
              <option value="popularidade">Popularidade</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="apenasDisponiveis"
              checked={filters.apenasDisponiveis !== false}
              onChange={(e) => handleApenasDisponiveisChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="apenasDisponiveis" className="ml-2 text-sm text-gray-700">
              Apenas disponíveis
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
