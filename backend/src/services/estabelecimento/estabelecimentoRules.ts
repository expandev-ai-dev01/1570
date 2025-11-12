import { getPool } from '@/instances/database';
import type * as mssql from 'mssql';
import {
  EstabelecimentoCompleto,
  EstabelecimentoInfo,
  HorarioFuncionamento,
  Feriado,
  ImagemHistoria,
  MembroEquipe,
  Certificacao,
  PerguntaFrequente,
  ImagemAcessibilidade,
} from './estabelecimentoTypes';

/**
 * @summary
 * Retrieves complete establishment information with all related data
 *
 * @function estabelecimentoGet
 * @module estabelecimento
 *
 * @returns {Promise<EstabelecimentoCompleto>} Complete establishment information
 *
 * @throws {ValidationError} When establishment doesn't exist
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const estabelecimento = await estabelecimentoGet();
 */
export async function estabelecimentoGet(): Promise<EstabelecimentoCompleto> {
  const pool = await getPool();
  const result = await pool.request().execute('[functional].[spEstabelecimentoGet]');

  const resultSets = result.recordsets as mssql.IRecordSet<any>[];

  const estabelecimentoData = resultSets[0][0] as EstabelecimentoInfo;
  const horarioFuncionamento = resultSets[1] as HorarioFuncionamento[];
  const feriados = resultSets[2] as Feriado[];
  const imagensHistoria = resultSets[3] as ImagemHistoria[];
  const equipe = resultSets[4] as MembroEquipe[];
  const certificacoes = resultSets[5] as Certificacao[];
  const perguntasFrequentes = resultSets[6] as PerguntaFrequente[];
  const imagensAcessibilidade = resultSets[7] as ImagemAcessibilidade[];

  return {
    estabelecimento: {
      ...estabelecimentoData,
      marcosHistoricos: estabelecimentoData.marcosHistoricos
        ? JSON.parse(estabelecimentoData.marcosHistoricos as string)
        : [],
      formasPagamento: estabelecimentoData.formasPagamento
        ? JSON.parse(estabelecimentoData.formasPagamento as string)
        : [],
      outrasPoliticas: estabelecimentoData.outrasPoliticas
        ? JSON.parse(estabelecimentoData.outrasPoliticas as string)
        : [],
      recursosAcessibilidade: estabelecimentoData.recursosAcessibilidade
        ? JSON.parse(estabelecimentoData.recursosAcessibilidade as string)
        : [],
    },
    horarioFuncionamento,
    feriados,
    imagensHistoria,
    equipe,
    certificacoes,
    perguntasFrequentes,
    imagensAcessibilidade,
  };
}
