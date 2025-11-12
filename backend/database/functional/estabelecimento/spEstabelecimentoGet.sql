/**
 * @summary
 * Retrieves complete establishment information including all related data
 *
 * @procedure spEstabelecimentoGet
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/estabelecimento
 *
 * @testScenarios
 * - Valid retrieval of establishment data
 * - Error when establishment doesn't exist
 * - Retrieve all related data (hours, holidays, team, etc.)
 */
CREATE OR ALTER PROCEDURE [functional].[spEstabelecimentoGet]
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate establishment exists
   * @throw {estabelecimentoDoesntExist}
   */
  IF NOT EXISTS (SELECT * FROM [functional].[estabelecimento])
  BEGIN
    ;THROW 51000, 'estabelecimentoDoesntExist', 1;
  END;

  /**
   * @output {EstabelecimentoInfo, 1, n}
   * @column {INT} idEstabelecimento - Establishment identifier
   * @column {NVARCHAR} nomeFantasia - Trade name
   * @column {NVARCHAR} razaoSocial - Legal name
   * @column {VARCHAR} cnpj - Tax ID
   * @column {NVARCHAR} logradouro - Street address
   * @column {NVARCHAR} numero - Address number
   * @column {NVARCHAR} complemento - Address complement
   * @column {NVARCHAR} bairro - Neighborhood
   * @column {NVARCHAR} cidade - City
   * @column {VARCHAR} estado - State code
   * @column {VARCHAR} cep - Postal code
   * @column {NVARCHAR} pontoReferencia - Reference point
   * @column {NUMERIC} latitude - Latitude coordinate
   * @column {NUMERIC} longitude - Longitude coordinate
   * @column {VARCHAR} telefoneFixo - Landline phone
   * @column {VARCHAR} telefoneCelular - Mobile phone
   * @column {VARCHAR} whatsapp - WhatsApp number
   * @column {VARCHAR} email - Email address
   * @column {NVARCHAR} facebook - Facebook URL
   * @column {NVARCHAR} instagram - Instagram URL
   * @column {NVARCHAR} twitter - Twitter URL
   * @column {NVARCHAR} youtube - YouTube URL
   * @column {NVARCHAR} tiktok - TikTok URL
   * @column {NVARCHAR} horarioAtendimentoContato - Contact hours
   * @column {DATE} dataFundacao - Foundation date
   * @column {NVARCHAR} fundadores - Founders names
   * @column {NVARCHAR} tituloHistoria - History title
   * @column {NVARCHAR} textoHistoria - History text
   * @column {NVARCHAR} videoHistoria - History video URL
   * @column {NVARCHAR} marcosHistoricos - Historical milestones JSON
   * @column {NVARCHAR} tituloPoliticas - Policies title
   * @column {NVARCHAR} formasPagamento - Payment methods JSON
   * @column {NVARCHAR} politicaDelivery - Delivery policy
   * @column {NUMERIC} taxaEntrega - Delivery fee
   * @column {INT} raioEntrega - Delivery radius
   * @column {NVARCHAR} tempoMedioEntrega - Average delivery time
   * @column {NVARCHAR} politicaCancelamento - Cancellation policy
   * @column {NVARCHAR} politicaReembolso - Refund policy
   * @column {NUMERIC} valorPedidoMinimo - Minimum order value
   * @column {NVARCHAR} outrasPoliticas - Other policies JSON
   * @column {NVARCHAR} tituloAcessibilidade - Accessibility title
   * @column {NVARCHAR} descricaoAcessibilidade - Accessibility description
   * @column {NVARCHAR} recursosAcessibilidade - Accessibility resources JSON
   * @column {NVARCHAR} contatoAcessibilidade - Accessibility contact
   */
  SELECT
    [est].[idEstabelecimento],
    [est].[nomeFantasia],
    [est].[razaoSocial],
    [est].[cnpj],
    [est].[logradouro],
    [est].[numero],
    [est].[complemento],
    [est].[bairro],
    [est].[cidade],
    [est].[estado],
    [est].[cep],
    [est].[pontoReferencia],
    [est].[latitude],
    [est].[longitude],
    [est].[telefoneFixo],
    [est].[telefoneCelular],
    [est].[whatsapp],
    [est].[email],
    [est].[facebook],
    [est].[instagram],
    [est].[twitter],
    [est].[youtube],
    [est].[tiktok],
    [est].[horarioAtendimentoContato],
    [est].[dataFundacao],
    [est].[fundadores],
    [est].[tituloHistoria],
    [est].[textoHistoria],
    [est].[videoHistoria],
    [est].[marcosHistoricos],
    [est].[tituloPoliticas],
    [est].[formasPagamento],
    [est].[politicaDelivery],
    [est].[taxaEntrega],
    [est].[raioEntrega],
    [est].[tempoMedioEntrega],
    [est].[politicaCancelamento],
    [est].[politicaReembolso],
    [est].[valorPedidoMinimo],
    [est].[outrasPoliticas],
    [est].[tituloAcessibilidade],
    [est].[descricaoAcessibilidade],
    [est].[recursosAcessibilidade],
    [est].[contatoAcessibilidade]
  FROM [functional].[estabelecimento] [est];

  /**
   * @output {HorarioFuncionamento, n, n}
   * @column {INT} idHorarioFuncionamento - Schedule identifier
   * @column {VARCHAR} diaSemana - Day of week
   * @column {TIME} horarioAbertura - Opening time
   * @column {TIME} horarioFechamento - Closing time
   * @column {VARCHAR} statusFuncionamento - Operating status
   * @column {NVARCHAR} observacao - Observation
   */
  SELECT
    [horFun].[idHorarioFuncionamento],
    [horFun].[diaSemana],
    [horFun].[horarioAbertura],
    [horFun].[horarioFechamento],
    [horFun].[statusFuncionamento],
    [horFun].[observacao]
  FROM [functional].[horarioFuncionamento] [horFun]
    JOIN [functional].[estabelecimento] [est] ON ([est].[idEstabelecimento] = [horFun].[idEstabelecimento])
  ORDER BY
    CASE [horFun].[diaSemana]
      WHEN 'Segunda-feira' THEN 1
      WHEN 'Terça-feira' THEN 2
      WHEN 'Quarta-feira' THEN 3
      WHEN 'Quinta-feira' THEN 4
      WHEN 'Sexta-feira' THEN 5
      WHEN 'Sábado' THEN 6
      WHEN 'Domingo' THEN 7
    END;

  /**
   * @output {Feriado, n, n}
   * @column {INT} idFeriado - Holiday identifier
   * @column {NVARCHAR} nome - Holiday name
   * @column {DATE} data - Holiday date
   * @column {TIME} horarioAbertura - Opening time
   * @column {TIME} horarioFechamento - Closing time
   * @column {VARCHAR} statusFuncionamento - Operating status
   */
  SELECT
    [fer].[idFeriado],
    [fer].[nome],
    [fer].[data],
    [fer].[horarioAbertura],
    [fer].[horarioFechamento],
    [fer].[statusFuncionamento]
  FROM [functional].[feriado] [fer]
    JOIN [functional].[estabelecimento] [est] ON ([est].[idEstabelecimento] = [fer].[idEstabelecimento])
  WHERE [fer].[data] >= CAST(GETUTCDATE() AS DATE)
  ORDER BY [fer].[data];

  /**
   * @output {ImagemHistoria, n, n}
   * @column {INT} idImagemHistoria - Image identifier
   * @column {NVARCHAR} urlImagem - Image URL
   * @column {NVARCHAR} legenda - Caption
   * @column {INT} ordem - Display order
   */
  SELECT
    [imgHis].[idImagemHistoria],
    [imgHis].[urlImagem],
    [imgHis].[legenda],
    [imgHis].[ordem]
  FROM [functional].[imagemHistoria] [imgHis]
    JOIN [functional].[estabelecimento] [est] ON ([est].[idEstabelecimento] = [imgHis].[idEstabelecimento])
  ORDER BY [imgHis].[ordem];

  /**
   * @output {MembroEquipe, n, n}
   * @column {INT} idMembroEquipe - Team member identifier
   * @column {NVARCHAR} nome - Member name
   * @column {NVARCHAR} cargo - Position
   * @column {NVARCHAR} fotoUrl - Photo URL
   * @column {NVARCHAR} biografia - Biography
   * @column {BIT} destaqueProprietario - Owner highlight
   * @column {INT} ordem - Display order
   */
  SELECT
    [memEqu].[idMembroEquipe],
    [memEqu].[nome],
    [memEqu].[cargo],
    [memEqu].[fotoUrl],
    [memEqu].[biografia],
    [memEqu].[destaqueProprietario],
    [memEqu].[ordem]
  FROM [functional].[membroEquipe] [memEqu]
    JOIN [functional].[estabelecimento] [est] ON ([est].[idEstabelecimento] = [memEqu].[idEstabelecimento])
  ORDER BY
    [memEqu].[destaqueProprietario] DESC,
    [memEqu].[ordem];

  /**
   * @output {Certificacao, n, n}
   * @column {INT} idCertificacao - Certification identifier
   * @column {NVARCHAR} nome - Certification name
   * @column {NVARCHAR} descricao - Description
   * @column {DATE} dataCertificacao - Certification date
   * @column {NVARCHAR} imagemUrl - Image URL
   * @column {NVARCHAR} entidadeCertificadora - Certifying entity
   */
  SELECT
    [cert].[idCertificacao],
    [cert].[nome],
    [cert].[descricao],
    [cert].[dataCertificacao],
    [cert].[imagemUrl],
    [cert].[entidadeCertificadora]
  FROM [functional].[certificacao] [cert]
    JOIN [functional].[estabelecimento] [est] ON ([est].[idEstabelecimento] = [cert].[idEstabelecimento])
  ORDER BY [cert].[dataCertificacao] DESC;

  /**
   * @output {PerguntaFrequente, n, n}
   * @column {INT} idPerguntaFrequente - FAQ identifier
   * @column {NVARCHAR} pergunta - Question
   * @column {NVARCHAR} resposta - Answer
   * @column {NVARCHAR} categoria - Category
   * @column {INT} ordemExibicao - Display order
   */
  SELECT
    [perFre].[idPerguntaFrequente],
    [perFre].[pergunta],
    [perFre].[resposta],
    [perFre].[categoria],
    [perFre].[ordemExibicao]
  FROM [functional].[perguntaFrequente] [perFre]
    JOIN [functional].[estabelecimento] [est] ON ([est].[idEstabelecimento] = [perFre].[idEstabelecimento])
  ORDER BY
    [perFre].[categoria],
    [perFre].[ordemExibicao];

  /**
   * @output {ImagemAcessibilidade, n, n}
   * @column {INT} idImagemAcessibilidade - Image identifier
   * @column {NVARCHAR} urlImagem - Image URL
   * @column {NVARCHAR} legenda - Caption
   * @column {INT} ordem - Display order
   */
  SELECT
    [imgAce].[idImagemAcessibilidade],
    [imgAce].[urlImagem],
    [imgAce].[legenda],
    [imgAce].[ordem]
  FROM [functional].[imagemAcessibilidade] [imgAce]
    JOIN [functional].[estabelecimento] [est] ON ([est].[idEstabelecimento] = [imgAce].[idEstabelecimento])
  ORDER BY [imgAce].[ordem];
END;
GO