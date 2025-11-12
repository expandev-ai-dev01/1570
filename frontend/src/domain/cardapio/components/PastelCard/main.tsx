import { cn } from '@/core/utils';
import type { PastelCardProps } from './types';

/**
 * @component PastelCard
 * @summary Card component displaying pastel information
 * @domain cardapio
 * @type domain-component
 * @category display
 */
export const PastelCard = ({ pastel, onClick }: PastelCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pastel);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg',
        onClick && 'cursor-pointer',
        !pastel.disponivel && 'opacity-60'
      )}
    >
      {pastel.imagemUrl && (
        <div className="aspect-video w-full overflow-hidden bg-gray-200">
          <img
            src={pastel.imagemUrl}
            alt={pastel.nome}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{pastel.nome}</h3>
          {pastel.destaque && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
              Destaque
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pastel.descricao}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">{formatPrice(pastel.preco)}</span>
          {!pastel.disponivel && (
            <span className="text-sm text-red-600 font-medium">Indisponível</span>
          )}
        </div>

        {pastel.restricoes && pastel.restricoes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {pastel.restricoes.map((restricao) => (
              <span
                key={restricao}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
              >
                {restricao}
              </span>
            ))}
          </div>
        )}

        {pastel.alergenicos && pastel.alergenicos.length > 0 && (
          <div className="mt-2 text-xs text-orange-600">
            ⚠️ Contém: {pastel.alergenicos.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};
