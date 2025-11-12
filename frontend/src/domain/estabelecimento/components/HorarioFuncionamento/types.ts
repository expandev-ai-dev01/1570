import type { Feriado } from '../../types';
import type { HorarioFuncionamento as HorarioFuncionamentoType } from '../../types';

export interface HorarioFuncionamentoProps {
  horarios: HorarioFuncionamentoType[];
  feriados?: Feriado[];
}
