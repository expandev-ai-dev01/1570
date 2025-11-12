import { useEstabelecimentoInfo } from '@/domain/estabelecimento/hooks';
import {
  HorarioFuncionamento,
  EnderecoMapa,
  CanaisContato,
  HistoriaEstabelecimento,
  EquipeProprietarios,
  PoliticasEstabelecimento,
  CertificacoesPremios,
  PerguntasFrequentes,
  InformacoesAcessibilidade,
} from '@/domain/estabelecimento/components';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { EstabelecimentoPageProps } from './types';

/**
 * @page EstabelecimentoPage
 * @summary Establishment information page with all details
 * @domain estabelecimento
 * @type detail-page
 * @category public
 *
 * @routing
 * - Path: /estabelecimento
 * - Params: none
 * - Query: none
 * - Guards: none
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Operating Hours, Address, Contact, History, Team, Policies, Certifications, FAQ, Accessibility
 * - Navigation: Anchor links to sections
 *
 * @data
 * - Sources: Estabelecimento API
 * - Loading: Skeleton loading states
 * - Caching: 10 minutes stale time
 */
export const EstabelecimentoPage = (props: EstabelecimentoPageProps) => {
  const { estabelecimento, isLoading, error } = useEstabelecimentoInfo();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !estabelecimento) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Informações não disponíveis</h2>
          <p className="text-gray-600">
            Não foi possível carregar as informações do estabelecimento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{estabelecimento.nome}</h1>
        {estabelecimento.descricao && (
          <p className="text-lg text-gray-600">{estabelecimento.descricao}</p>
        )}
      </div>

      <div className="space-y-8">
        <section id="horario">
          <HorarioFuncionamento
            horarios={estabelecimento.horarioFuncionamento}
            feriados={estabelecimento.feriados}
          />
        </section>

        <section id="endereco">
          <EnderecoMapa endereco={estabelecimento.endereco} />
        </section>

        <section id="contato">
          <CanaisContato contato={estabelecimento.contato} />
        </section>

        <section id="historia">
          <HistoriaEstabelecimento historia={estabelecimento.historia} />
        </section>

        {estabelecimento.equipe && estabelecimento.equipe.length > 0 && (
          <section id="equipe">
            <EquipeProprietarios equipe={estabelecimento.equipe} />
          </section>
        )}

        <section id="politicas">
          <PoliticasEstabelecimento politicas={estabelecimento.politicas} />
        </section>

        {estabelecimento.certificacoes && estabelecimento.certificacoes.length > 0 && (
          <section id="certificacoes">
            <CertificacoesPremios certificacoes={estabelecimento.certificacoes} />
          </section>
        )}

        {estabelecimento.perguntasFrequentes && estabelecimento.perguntasFrequentes.length > 0 && (
          <section id="faq">
            <PerguntasFrequentes perguntas={estabelecimento.perguntasFrequentes} />
          </section>
        )}

        {estabelecimento.acessibilidade && (
          <section id="acessibilidade">
            <InformacoesAcessibilidade acessibilidade={estabelecimento.acessibilidade} />
          </section>
        )}
      </div>
    </div>
  );
};

export default EstabelecimentoPage;
