import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/core/utils';
import type { PromocaoCardProps } from './types';

/**
 * @component PromocaoCard
 * @summary Card component displaying promotion information
 * @domain promocao
 * @type domain-component
 * @category display
 */
export const PromocaoCard = ({ promocao, onClick }: PromocaoCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(promocao);
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

  const getDaysRemaining = () => {
    if (promocao.status !== 'ativa') return null;
    try {
      const today = new Date();
      const endDate = new Date(promocao.dataTermino);
      const days = differenceInDays(endDate, today);
      return days >= 0 ? days : 0;
    } catch (error: unknown) {
      return null;
    }
  };

  const daysRemaining = getDaysRemaining();
  const showCountdown = daysRemaining !== null && daysRemaining <= 3;

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      diaria: 'Promoção Diária',
      semanal: 'Promoção Semanal',
      sazonal: 'Promoção Sazonal',
      data_comemorativa: 'Data Comemorativa',
    };
    return labels[categoria] || categoria;
  };

  const getStatusBadge = () => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      agendada: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Em Breve' },
      ativa: { bg: 'bg-green-100', text: 'text-green-800', label: 'Ativa' },
      encerrada: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Encerrada' },
    };
    return badges[promocao.status] || badges.ativa;
  };

  const statusBadge = getStatusBadge();

  return (
    <div
      onClick={handleClick}
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg',
        onClick && 'cursor-pointer',
        promocao.status === 'encerrada' && 'opacity-60'
      )}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-gray-200">
          <img
            src={promocao.imagem}
            alt={promocao.titulo}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          {promocao.destaque && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              ⭐ Destaque
            </span>
          )}
          <span
            className={cn(
              'text-xs font-medium px-3 py-1 rounded-full',
              statusBadge.bg,
              statusBadge.text
            )}
          >
            {statusBadge.label}
          </span>
        </div>

        {showCountdown && (
          <div className="absolute bottom-3 left-3 bg-red-600 text-white px-3 py-2 rounded-md">
            <p className="text-xs font-semibold">
              ⏰ Termina em {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
            </p>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">{promocao.titulo}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{promocao.descricao}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">{getCategoriaLabel(promocao.categoria)}</span>
          {promocao.desconto && (
            <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded">
              {promocao.desconto}% OFF
            </span>
          )}
          {promocao.valorPromocional && !promocao.desconto && (
            <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded">
              R$ {promocao.valorPromocional.toFixed(2)}
            </span>
          )}
        </div>

        <div className="text-xs text-gray-500 border-t border-gray-200 pt-3">
          <p>
            Válido de {formatDate(promocao.dataInicio)} até {formatDate(promocao.dataTermino)}
          </p>
        </div>
      </div>
    </div>
  );
};
