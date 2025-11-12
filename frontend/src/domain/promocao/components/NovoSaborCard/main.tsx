import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/core/utils';
import type { NovoSaborCardProps } from './types';

/**
 * @component NovoSaborCard
 * @summary Card component displaying new flavor information
 * @domain promocao
 * @type domain-component
 * @category display
 */
export const NovoSaborCard = ({ novoSabor, onClick }: NovoSaborCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(novoSabor);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getDaysAsNew = () => {
    try {
      const today = new Date();
      const addedDate = new Date(novoSabor.dataAdicao);
      const days = differenceInDays(today, addedDate);
      return days >= 0 ? days : 0;
    } catch (error: unknown) {
      return 0;
    }
  };

  const daysAsNew = getDaysAsNew();
  const daysRemaining = novoSabor.periodoNovidade - daysAsNew;

  return (
    <div
      onClick={handleClick}
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg',
        onClick && 'cursor-pointer',
        !novoSabor.pastel.disponivel && 'opacity-60'
      )}
    >
      <div className="relative">
        {novoSabor.pastel.imagemUrl ? (
          <div className="aspect-video w-full overflow-hidden bg-gray-200">
            <img
              src={novoSabor.pastel.imagemUrl}
              alt={novoSabor.pastel.nome}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
            <span className="text-6xl">🥟</span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-2">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            ✨ NOVO
          </span>
          {novoSabor.destaqueHome && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              ⭐
            </span>
          )}
        </div>

        {daysRemaining > 0 && daysRemaining <= 7 && (
          <div className="absolute bottom-3 left-3 bg-purple-600 text-white px-3 py-2 rounded-md">
            <p className="text-xs font-semibold">
              Novidade por mais {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
            </p>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{novoSabor.pastel.nome}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{novoSabor.pastel.descricao}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(novoSabor.pastel.preco)}
          </span>
          {!novoSabor.pastel.disponivel && (
            <span className="text-sm text-red-600 font-medium">Indisponível</span>
          )}
        </div>

        <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
          <p>
            Adicionado há {daysAsNew} {daysAsNew === 1 ? 'dia' : 'dias'}
          </p>
        </div>
      </div>
    </div>
  );
};
