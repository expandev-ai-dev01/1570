import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/core/utils';
import type { HorarioFuncionamentoProps } from './types';

/**
 * @component HorarioFuncionamento
 * @summary Displays operating hours by day of week
 * @domain estabelecimento
 * @type domain-component
 * @category display
 */
export const HorarioFuncionamento = ({ horarios, feriados }: HorarioFuncionamentoProps) => {
  const diasOrdem = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];
  const horariosOrdenados = [...horarios].sort(
    (a, b) => diasOrdem.indexOf(a.diaSemana) - diasOrdem.indexOf(b.diaSemana)
  );

  const hoje = format(new Date(), 'EEEE', { locale: ptBR });
  const diaHojeFormatado = hoje.charAt(0).toUpperCase() + hoje.slice(1);

  const isAberto = (horario: (typeof horarios)[0]) => {
    if (horario.statusFuncionamento === 'Fechado') return false;
    const agora = new Date();
    const [horaAbertura, minutoAbertura] = horario.horarioAbertura.split(':').map(Number);
    const [horaFechamento, minutoFechamento] = horario.horarioFechamento.split(':').map(Number);
    const abertura = new Date(agora);
    abertura.setHours(horaAbertura, minutoAbertura, 0);
    const fechamento = new Date(agora);
    fechamento.setHours(horaFechamento, minutoFechamento, 0);
    return agora >= abertura && agora <= fechamento;
  };

  const horarioHoje = horariosOrdenados.find((h) => h.diaSemana === diaHojeFormatado);
  const estaAberto = horarioHoje ? isAberto(horarioHoje) : false;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Horário de Funcionamento</h2>
        <span
          className={cn(
            'px-4 py-2 rounded-full text-sm font-semibold',
            estaAberto ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
        >
          {estaAberto ? '🟢 Aberto Agora' : '🔴 Fechado Agora'}
        </span>
      </div>

      <div className="space-y-3">
        {horariosOrdenados.map((horario) => {
          const isHoje = horario.diaSemana === diaHojeFormatado;
          return (
            <div
              key={horario.diaSemana}
              className={cn(
                'flex items-center justify-between p-3 rounded-md',
                isHoje ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
              )}
            >
              <div className="flex-1">
                <span className={cn('font-medium', isHoje ? 'text-blue-900' : 'text-gray-900')}>
                  {horario.diaSemana}
                </span>
                {horario.observacao && (
                  <p className="text-xs text-gray-600 mt-1">{horario.observacao}</p>
                )}
              </div>
              <div className="text-right">
                {horario.statusFuncionamento === 'Fechado' ? (
                  <span className="text-red-600 font-medium">Fechado</span>
                ) : (
                  <span className={cn('font-medium', isHoje ? 'text-blue-900' : 'text-gray-700')}>
                    {horario.horarioAbertura} - {horario.horarioFechamento}
                  </span>
                )}
                {horario.statusFuncionamento === 'Horário especial' && (
                  <span className="block text-xs text-orange-600 mt-1">Horário especial</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {feriados && feriados.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Próximos Feriados</h3>
          <div className="space-y-2">
            {feriados.map((feriado, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-yellow-50 rounded-md"
              >
                <div>
                  <span className="font-medium text-gray-900">{feriado.nome}</span>
                  <p className="text-sm text-gray-600">
                    {format(new Date(feriado.data), 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                </div>
                {feriado.horarioAbertura && feriado.horarioFechamento ? (
                  <span className="text-sm font-medium text-gray-700">
                    {feriado.horarioAbertura} - {feriado.horarioFechamento}
                  </span>
                ) : (
                  <span className="text-sm font-medium text-red-600">Fechado</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
