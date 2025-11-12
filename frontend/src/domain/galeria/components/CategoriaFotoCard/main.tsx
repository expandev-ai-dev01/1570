import { cn } from '@/core/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { CategoriaFotoCardProps } from './types';

/**
 * @component CategoriaFotoCard
 * @summary Card component displaying photo category information
 * @domain galeria
 * @type domain-component
 * @category display
 */
export const CategoriaFotoCard = ({ categoria, onClick }: CategoriaFotoCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(categoria);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (error: unknown) {
      return dateString;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{categoria.nome}</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
            {categoria.quantidadeFotos} {categoria.quantidadeFotos === 1 ? 'foto' : 'fotos'}
          </span>
        </div>

        {categoria.descricao && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{categoria.descricao}</p>
        )}

        <div className="text-xs text-gray-500">
          Atualizado em: {formatDate(categoria.dataAtualizacao)}
        </div>
      </div>
    </div>
  );
};
