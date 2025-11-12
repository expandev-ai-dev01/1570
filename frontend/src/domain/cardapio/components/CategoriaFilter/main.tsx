import { cn } from '@/core/utils';
import type { CategoriaFilterProps } from './types';

/**
 * @component CategoriaFilter
 * @summary Filter component for selecting categories
 * @domain cardapio
 * @type domain-component
 * @category filter
 */
export const CategoriaFilter = ({
  categorias,
  selectedCategoriaId,
  onSelectCategoria,
}: CategoriaFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategoria(undefined)}
        className={cn(
          'px-4 py-2 rounded-md text-sm font-medium transition-colors',
          !selectedCategoriaId
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        )}
      >
        Todos
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria.idCategoria}
          onClick={() => onSelectCategoria(categoria.idCategoria)}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            selectedCategoriaId === categoria.idCategoria
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          )}
        >
          {categoria.nome}
          {categoria.totalPasteis > 0 && (
            <span className="ml-2 text-xs">({categoria.totalPasteis})</span>
          )}
        </button>
      ))}
    </div>
  );
};
