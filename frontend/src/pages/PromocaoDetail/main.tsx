import { useParams, useNavigate } from 'react-router-dom';
import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { usePromocaoDetail } from '@/domain/promocao/hooks';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { PromocaoDetailPageProps } from './types';

/**
 * @page PromocaoDetailPage
 * @summary Detailed view of a single promotion
 * @domain promocao
 * @type detail-page
 * @category public
 *
 * @routing
 * - Path: /promocoes/:id
 * - Params: { id: string }
 * - Query: none
 * - Guards: none
 */
export const PromocaoDetailPage = (props: PromocaoDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const promocaoId = id ? parseInt(id, 10) : 0;
  const { promocao, isLoading, error } = usePromocaoDetail({
    id: promocaoId,
    enabled: promocaoId > 0,
  });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error: unknown) {
      return dateString;
    }
  };

  const getTimeRemaining = () => {
    if (!promocao || promocao.status !== 'ativa') return null;
    try {
      const now = new Date();
      const endDate = new Date(promocao.dataTermino);
      const days = differenceInDays(endDate, now);
      const hours = differenceInHours(endDate, now) % 24;
      const minutes = differenceInMinutes(endDate, now) % 60;
      return { days, hours, minutes };
    } catch (error: unknown) {
      return null;
    }
  };

  const timeRemaining = getTimeRemaining();

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      diaria: 'Promoção Diária',
      semanal: 'Promoção Semanal',
      sazonal: 'Promoção Sazonal',
      data_comemorativa: 'Data Comemorativa',
    };
    return labels[categoria] || categoria;
  };

  const handleShare = async () => {
    if (navigator.share && promocao) {
      try {
        await navigator.share({
          title: promocao.titulo,
          text: promocao.descricao,
          url: window.location.href,
        });
      } catch (error: unknown) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !promocao) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Promoção não encontrada</h2>
          <button
            onClick={() => navigate('/promocoes')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Voltar às Promoções
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/promocoes')}
        className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
      >
        ← Voltar às Promoções
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden bg-gray-200">
            <img
              src={promocao.imagem}
              alt={promocao.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            {promocao.destaque && (
              <span className="bg-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                ⭐ Destaque
              </span>
            )}
            {promocao.status === 'ativa' && (
              <span className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                Ativa
              </span>
            )}
            {promocao.status === 'agendada' && (
              <span className="bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                Em Breve
              </span>
            )}
            {promocao.status === 'encerrada' && (
              <span className="bg-gray-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                Encerrada
              </span>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{promocao.titulo}</h1>
            <p className="text-sm text-gray-500">{getCategoriaLabel(promocao.categoria)}</p>
          </div>

          {timeRemaining && (
            <div className="mb-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-3">⏰ Tempo Restante</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{timeRemaining.days}</div>
                  <div className="text-sm text-gray-600">
                    {timeRemaining.days === 1 ? 'Dia' : 'Dias'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{timeRemaining.hours}</div>
                  <div className="text-sm text-gray-600">
                    {timeRemaining.hours === 1 ? 'Hora' : 'Horas'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{timeRemaining.minutes}</div>
                  <div className="text-sm text-gray-600">
                    {timeRemaining.minutes === 1 ? 'Minuto' : 'Minutos'}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-lg text-gray-700 whitespace-pre-line">{promocao.descricao}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {promocao.desconto && (
              <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Desconto</h3>
                <p className="text-4xl font-bold text-red-600">{promocao.desconto}% OFF</p>
              </div>
            )}
            {promocao.valorPromocional && (
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Valor Promocional</h3>
                <p className="text-4xl font-bold text-green-600">
                  R$ {promocao.valorPromocional.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📅 Período de Validade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Início</span>
                <p className="text-lg font-medium text-gray-900">
                  {formatDate(promocao.dataInicio)}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Término</span>
                <p className="text-lg font-medium text-gray-900">
                  {formatDate(promocao.dataTermino)}
                </p>
              </div>
            </div>
          </div>

          {promocao.termosCondicoes && (
            <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Termos e Condições</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {promocao.termosCondicoes}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              📤 Compartilhar Promoção
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromocaoDetailPage;
