/**
 * @schema functional
 * Business logic schema for Pastelaria system
 */
CREATE SCHEMA [functional];
GO

/**
 * @table categoria Brief: Categorias de pastéis
 * @multitenancy false
 * @softDelete false
 * @alias cat
 */
CREATE TABLE [functional].[categoria] (
  [idCategoria] INTEGER IDENTITY(1, 1) NOT NULL,
  [nome] NVARCHAR(30) NOT NULL,
  [descricao] NVARCHAR(200) NOT NULL DEFAULT (''),
  [icone] NVARCHAR(500) NULL,
  [ordem] INTEGER NOT NULL DEFAULT (999),
  [ativa] BIT NOT NULL DEFAULT (1)
);
GO

/**
 * @primaryKey pkCategoria
 * @keyType Object
 */
ALTER TABLE [functional].[categoria]
ADD CONSTRAINT [pkCategoria] PRIMARY KEY CLUSTERED ([idCategoria]);
GO

/**
 * @index ixCategoria_Nome
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [ixCategoria_Nome]
ON [functional].[categoria]([nome]);
GO

/**
 * @index ixCategoria_Ativa_Ordem
 * @type Performance
 * @filter Active categories ordered for display
 */
CREATE NONCLUSTERED INDEX [ixCategoria_Ativa_Ordem]
ON [functional].[categoria]([ativa], [ordem])
WHERE [ativa] = 1;
GO

/**
 * @table pastel Brief: Pastéis disponíveis no cardápio
 * @multitenancy false
 * @softDelete false
 * @alias pst
 */
CREATE TABLE [functional].[pastel] (
  [idPastel] INTEGER IDENTITY(1, 1) NOT NULL,
  [idCategoria] INTEGER NOT NULL,
  [nome] NVARCHAR(50) NOT NULL,
  [descricao] NVARCHAR(300) NOT NULL,
  [preco] NUMERIC(18, 6) NOT NULL,
  [imagemUrl] NVARCHAR(500) NULL,
  [disponivel] BIT NOT NULL DEFAULT (1),
  [destaque] BIT NOT NULL DEFAULT (0),
  [ingredientes] NVARCHAR(MAX) NOT NULL,
  [alergenicos] NVARCHAR(MAX) NULL,
  [infoNutricional] NVARCHAR(MAX) NULL,
  [restricoes] NVARCHAR(MAX) NULL,
  [motivoIndisponibilidade] NVARCHAR(100) NULL,
  [previsaoDisponibilidade] DATETIME2 NULL
);
GO

/**
 * @primaryKey pkPastel
 * @keyType Object
 */
ALTER TABLE [functional].[pastel]
ADD CONSTRAINT [pkPastel] PRIMARY KEY CLUSTERED ([idPastel]);
GO

/**
 * @foreignKey fkPastel_Categoria Relationship between pastel and categoria
 * @target functional.categoria
 */
ALTER TABLE [functional].[pastel]
ADD CONSTRAINT [fkPastel_Categoria] FOREIGN KEY ([idCategoria])
REFERENCES [functional].[categoria]([idCategoria]);
GO

/**
 * @check chkPastel_Preco Price must be at least 1.00
 */
ALTER TABLE [functional].[pastel]
ADD CONSTRAINT [chkPastel_Preco] CHECK ([preco] >= 1.00);
GO

/**
 * @index ixPastel_Categoria
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixPastel_Categoria]
ON [functional].[pastel]([idCategoria]);
GO

/**
 * @index uqPastel_Nome
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqPastel_Nome]
ON [functional].[pastel]([nome]);
GO

/**
 * @index ixPastel_Disponivel_Destaque
 * @type Performance
 * @filter Optimizes listing queries with availability and highlight filters
 */
CREATE NONCLUSTERED INDEX [ixPastel_Disponivel_Destaque]
ON [functional].[pastel]([disponivel], [destaque])
INCLUDE ([nome], [preco], [idCategoria]);
GO

/**
 * @index ixPastel_Preco
 * @type Performance
 * @filter Optimizes price range filtering
 */
CREATE NONCLUSTERED INDEX [ixPastel_Preco]
ON [functional].[pastel]([preco])
INCLUDE ([idPastel], [nome], [disponivel]);
GO

/**
 * @table categoriaFoto Brief: Categorias de fotos da galeria
 * @multitenancy false
 * @softDelete false
 * @alias catFot
 */
CREATE TABLE [functional].[categoriaFoto] (
  [idCategoriaFoto] INTEGER IDENTITY(1, 1) NOT NULL,
  [nome] NVARCHAR(50) NOT NULL,
  [descricao] NVARCHAR(200) NOT NULL DEFAULT (''),
  [ordem] INTEGER NOT NULL DEFAULT (999),
  [ativa] BIT NOT NULL DEFAULT (1),
  [dataAtualizacao] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @primaryKey pkCategoriaFoto
 * @keyType Object
 */
ALTER TABLE [functional].[categoriaFoto]
ADD CONSTRAINT [pkCategoriaFoto] PRIMARY KEY CLUSTERED ([idCategoriaFoto]);
GO

/**
 * @index uqCategoriaFoto_Nome
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqCategoriaFoto_Nome]
ON [functional].[categoriaFoto]([nome]);
GO

/**
 * @index ixCategoriaFoto_Ativa_Ordem
 * @type Performance
 * @filter Active photo categories ordered for display
 */
CREATE NONCLUSTERED INDEX [ixCategoriaFoto_Ativa_Ordem]
ON [functional].[categoriaFoto]([ativa], [ordem])
WHERE [ativa] = 1;
GO

/**
 * @table foto Brief: Fotos da galeria
 * @multitenancy false
 * @softDelete false
 * @alias fot
 */
CREATE TABLE [functional].[foto] (
  [idFoto] INTEGER IDENTITY(1, 1) NOT NULL,
  [idCategoriaFoto] INTEGER NOT NULL,
  [titulo] NVARCHAR(100) NOT NULL,
  [descricao] NVARCHAR(500) NULL,
  [urlFoto] NVARCHAR(500) NOT NULL,
  [urlMiniatura] NVARCHAR(500) NOT NULL,
  [dataFoto] DATE NOT NULL,
  [creditos] NVARCHAR(100) NULL,
  [ordem] INTEGER NOT NULL DEFAULT (999),
  [ativa] BIT NOT NULL DEFAULT (1)
);
GO

/**
 * @primaryKey pkFoto
 * @keyType Object
 */
ALTER TABLE [functional].[foto]
ADD CONSTRAINT [pkFoto] PRIMARY KEY CLUSTERED ([idFoto]);
GO

/**
 * @foreignKey fkFoto_CategoriaFoto Relationship between foto and categoriaFoto
 * @target functional.categoriaFoto
 */
ALTER TABLE [functional].[foto]
ADD CONSTRAINT [fkFoto_CategoriaFoto] FOREIGN KEY ([idCategoriaFoto])
REFERENCES [functional].[categoriaFoto]([idCategoriaFoto]);
GO

/**
 * @index ixFoto_CategoriaFoto
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixFoto_CategoriaFoto]
ON [functional].[foto]([idCategoriaFoto]);
GO

/**
 * @index ixFoto_CategoriaFoto_Ativa_DataFoto
 * @type Performance
 * @filter Optimizes listing queries with category, active status and date ordering
 */
CREATE NONCLUSTERED INDEX [ixFoto_CategoriaFoto_Ativa_DataFoto]
ON [functional].[foto]([idCategoriaFoto], [ativa], [dataFoto] DESC)
INCLUDE ([titulo], [urlMiniatura], [ordem])
WHERE [ativa] = 1;
GO

/**
 * @index ixFoto_DataFoto
 * @type Performance
 * @filter Optimizes date range filtering
 */
CREATE NONCLUSTERED INDEX [ixFoto_DataFoto]
ON [functional].[foto]([dataFoto] DESC)
INCLUDE ([idFoto], [idCategoriaFoto], [titulo])
WHERE [ativa] = 1;
GO

/**
 * @table estabelecimento Brief: Informações do estabelecimento
 * @multitenancy false
 * @softDelete false
 * @alias est
 */
CREATE TABLE [functional].[estabelecimento] (
  [idEstabelecimento] INTEGER IDENTITY(1, 1) NOT NULL,
  [nomeFantasia] NVARCHAR(100) NOT NULL,
  [razaoSocial] NVARCHAR(200) NULL,
  [cnpj] VARCHAR(18) NULL,
  [logradouro] NVARCHAR(100) NOT NULL,
  [numero] NVARCHAR(10) NOT NULL,
  [complemento] NVARCHAR(50) NULL,
  [bairro] NVARCHAR(50) NOT NULL,
  [cidade] NVARCHAR(50) NOT NULL,
  [estado] VARCHAR(2) NOT NULL,
  [cep] VARCHAR(9) NOT NULL,
  [pontoReferencia] NVARCHAR(200) NULL,
  [latitude] NUMERIC(10, 8) NOT NULL,
  [longitude] NUMERIC(11, 8) NOT NULL,
  [telefoneFixo] VARCHAR(15) NULL,
  [telefoneCelular] VARCHAR(15) NOT NULL,
  [whatsapp] VARCHAR(15) NULL,
  [email] VARCHAR(100) NOT NULL,
  [facebook] NVARCHAR(200) NULL,
  [instagram] NVARCHAR(200) NULL,
  [twitter] NVARCHAR(200) NULL,
  [youtube] NVARCHAR(200) NULL,
  [tiktok] NVARCHAR(200) NULL,
  [horarioAtendimentoContato] NVARCHAR(200) NOT NULL,
  [dataFundacao] DATE NOT NULL,
  [fundadores] NVARCHAR(200) NOT NULL,
  [tituloHistoria] NVARCHAR(100) NOT NULL,
  [textoHistoria] NVARCHAR(MAX) NOT NULL,
  [videoHistoria] NVARCHAR(200) NULL,
  [marcosHistoricos] NVARCHAR(MAX) NULL,
  [tituloPoliticas] NVARCHAR(100) NOT NULL,
  [formasPagamento] NVARCHAR(MAX) NOT NULL,
  [politicaDelivery] NVARCHAR(1000) NULL,
  [taxaEntrega] NUMERIC(18, 6) NULL,
  [raioEntrega] INTEGER NULL,
  [tempoMedioEntrega] NVARCHAR(50) NULL,
  [politicaCancelamento] NVARCHAR(1000) NULL,
  [politicaReembolso] NVARCHAR(1000) NULL,
  [valorPedidoMinimo] NUMERIC(18, 6) NULL,
  [outrasPoliticas] NVARCHAR(MAX) NULL,
  [tituloAcessibilidade] NVARCHAR(100) NULL,
  [descricaoAcessibilidade] NVARCHAR(1000) NULL,
  [recursosAcessibilidade] NVARCHAR(MAX) NULL,
  [contatoAcessibilidade] NVARCHAR(200) NULL,
  [dataAtualizacao] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @primaryKey pkEstabelecimento
 * @keyType Object
 */
ALTER TABLE [functional].[estabelecimento]
ADD CONSTRAINT [pkEstabelecimento] PRIMARY KEY CLUSTERED ([idEstabelecimento]);
GO

/**
 * @check chkEstabelecimento_Estado Valid Brazilian state code
 */
ALTER TABLE [functional].[estabelecimento]
ADD CONSTRAINT [chkEstabelecimento_Estado] CHECK ([estado] IN ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'));
GO

/**
 * @table horarioFuncionamento Brief: Horários de funcionamento do estabelecimento
 * @multitenancy false
 * @softDelete false
 * @alias horFun
 */
CREATE TABLE [functional].[horarioFuncionamento] (
  [idHorarioFuncionamento] INTEGER IDENTITY(1, 1) NOT NULL,
  [idEstabelecimento] INTEGER NOT NULL,
  [diaSemana] VARCHAR(20) NOT NULL,
  [horarioAbertura] TIME NOT NULL,
  [horarioFechamento] TIME NOT NULL,
  [statusFuncionamento] VARCHAR(20) NOT NULL,
  [observacao] NVARCHAR(200) NULL
);
GO

/**
 * @primaryKey pkHorarioFuncionamento
 * @keyType Object
 */
ALTER TABLE [functional].[horarioFuncionamento]
ADD CONSTRAINT [pkHorarioFuncionamento] PRIMARY KEY CLUSTERED ([idHorarioFuncionamento]);
GO

/**
 * @foreignKey fkHorarioFuncionamento_Estabelecimento Relationship between horarioFuncionamento and estabelecimento
 * @target functional.estabelecimento
 */
ALTER TABLE [functional].[horarioFuncionamento]
ADD CONSTRAINT [fkHorarioFuncionamento_Estabelecimento] FOREIGN KEY ([idEstabelecimento])
REFERENCES [functional].[estabelecimento]([idEstabelecimento]);
GO

/**
 * @check chkHorarioFuncionamento_DiaSemana Valid day of week
 */
ALTER TABLE [functional].[horarioFuncionamento]
ADD CONSTRAINT [chkHorarioFuncionamento_DiaSemana] CHECK ([diaSemana] IN ('Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'));
GO

/**
 * @check chkHorarioFuncionamento_StatusFuncionamento Valid status
 */
ALTER TABLE [functional].[horarioFuncionamento]
ADD CONSTRAINT [chkHorarioFuncionamento_StatusFuncionamento] CHECK ([statusFuncionamento] IN ('Aberto', 'Fechado', 'Horário especial'));
GO

/**
 * @index ixHorarioFuncionamento_Estabelecimento
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixHorarioFuncionamento_Estabelecimento]
ON [functional].[horarioFuncionamento]([idEstabelecimento]);
GO

/**
 * @index uqHorarioFuncionamento_Estabelecimento_DiaSemana
 * @type Search
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqHorarioFuncionamento_Estabelecimento_DiaSemana]
ON [functional].[horarioFuncionamento]([idEstabelecimento], [diaSemana]);
GO

/**
 * @table feriado Brief: Feriados com horários especiais
 * @multitenancy false
 * @softDelete false
 * @alias fer
 */
CREATE TABLE [functional].[feriado] (
  [idFeriado] INTEGER IDENTITY(1, 1) NOT NULL,
  [idEstabelecimento] INTEGER NOT NULL,
  [nome] NVARCHAR(100) NOT NULL,
  [data] DATE NOT NULL,
  [horarioAbertura] TIME NULL,
  [horarioFechamento] TIME NULL,
  [statusFuncionamento] VARCHAR(20) NOT NULL
);
GO

/**
 * @primaryKey pkFeriado
 * @keyType Object
 */
ALTER TABLE [functional].[feriado]
ADD CONSTRAINT [pkFeriado] PRIMARY KEY CLUSTERED ([idFeriado]);
GO

/**
 * @foreignKey fkFeriado_Estabelecimento Relationship between feriado and estabelecimento
 * @target functional.estabelecimento
 */
ALTER TABLE [functional].[feriado]
ADD CONSTRAINT [fkFeriado_Estabelecimento] FOREIGN KEY ([idEstabelecimento])
REFERENCES [functional].[estabelecimento]([idEstabelecimento]);
GO

/**
 * @check chkFeriado_StatusFuncionamento Valid status
 */
ALTER TABLE [functional].[feriado]
ADD CONSTRAINT [chkFeriado_StatusFuncionamento] CHECK ([statusFuncionamento] IN ('Aberto', 'Fechado', 'Horário especial'));
GO

/**
 * @index ixFeriado_Estabelecimento
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixFeriado_Estabelecimento]
ON [functional].[feriado]([idEstabelecimento]);
GO

/**
 * @index ixFeriado_Data
 * @type Performance
 * @filter Optimizes date range queries
 */
CREATE NONCLUSTERED INDEX [ixFeriado_Data]
ON [functional].[feriado]([data] DESC)
INCLUDE ([idEstabelecimento], [nome], [statusFuncionamento]);
GO

/**
 * @table imagemHistoria Brief: Imagens históricas do estabelecimento
 * @multitenancy false
 * @softDelete false
 * @alias imgHis
 */
CREATE TABLE [functional].[imagemHistoria] (
  [idImagemHistoria] INTEGER IDENTITY(1, 1) NOT NULL,
  [idEstabelecimento] INTEGER NOT NULL,
  [urlImagem] NVARCHAR(500) NOT NULL,
  [legenda] NVARCHAR(200) NULL,
  [ordem] INTEGER NOT NULL DEFAULT (999)
);
GO

/**
 * @primaryKey pkImagemHistoria
 * @keyType Object
 */
ALTER TABLE [functional].[imagemHistoria]
ADD CONSTRAINT [pkImagemHistoria] PRIMARY KEY CLUSTERED ([idImagemHistoria]);
GO

/**
 * @foreignKey fkImagemHistoria_Estabelecimento Relationship between imagemHistoria and estabelecimento
 * @target functional.estabelecimento
 */
ALTER TABLE [functional].[imagemHistoria]
ADD CONSTRAINT [fkImagemHistoria_Estabelecimento] FOREIGN KEY ([idEstabelecimento])
REFERENCES [functional].[estabelecimento]([idEstabelecimento]);
GO

/**
 * @index ixImagemHistoria_Estabelecimento_Ordem
 * @type Performance
 * @filter Optimizes ordered listing
 */
CREATE NONCLUSTERED INDEX [ixImagemHistoria_Estabelecimento_Ordem]
ON [functional].[imagemHistoria]([idEstabelecimento], [ordem]);
GO

/**
 * @table membroEquipe Brief: Membros da equipe do estabelecimento
 * @multitenancy false
 * @softDelete false
 * @alias memEqu
 */
CREATE TABLE [functional].[membroEquipe] (
  [idMembroEquipe] INTEGER IDENTITY(1, 1) NOT NULL,
  [idEstabelecimento] INTEGER NOT NULL,
  [nome] NVARCHAR(100) NOT NULL,
  [cargo] NVARCHAR(100) NOT NULL,
  [fotoUrl] NVARCHAR(500) NULL,
  [biografia] NVARCHAR(500) NULL,
  [destaqueProprietario] BIT NOT NULL DEFAULT (0),
  [ordem] INTEGER NOT NULL DEFAULT (999)
);
GO

/**
 * @primaryKey pkMembroEquipe
 * @keyType Object
 */
ALTER TABLE [functional].[membroEquipe]
ADD CONSTRAINT [pkMembroEquipe] PRIMARY KEY CLUSTERED ([idMembroEquipe]);
GO

/**
 * @foreignKey fkMembroEquipe_Estabelecimento Relationship between membroEquipe and estabelecimento
 * @target functional.estabelecimento
 */
ALTER TABLE [functional].[membroEquipe]
ADD CONSTRAINT [fkMembroEquipe_Estabelecimento] FOREIGN KEY ([idEstabelecimento])
REFERENCES [functional].[estabelecimento]([idEstabelecimento]);
GO

/**
 * @index ixMembroEquipe_Estabelecimento_Destaque_Ordem
 * @type Performance
 * @filter Optimizes ordered listing with owner highlight
 */
CREATE NONCLUSTERED INDEX [ixMembroEquipe_Estabelecimento_Destaque_Ordem]
ON [functional].[membroEquipe]([idEstabelecimento], [destaqueProprietario] DESC, [ordem]);
GO

/**
 * @table certificacao Brief: Certificações e prêmios do estabelecimento
 * @multitenancy false
 * @softDelete false
 * @alias cert
 */
CREATE TABLE [functional].[certificacao] (
  [idCertificacao] INTEGER IDENTITY(1, 1) NOT NULL,
  [idEstabelecimento] INTEGER NOT NULL,
  [nome] NVARCHAR(100) NOT NULL,
  [descricao] NVARCHAR(500) NULL,
  [dataCertificacao] DATE NOT NULL,
  [imagemUrl] NVARCHAR(500) NULL,
  [entidadeCertificadora] NVARCHAR(100) NULL
);
GO

/**
 * @primaryKey pkCertificacao
 * @keyType Object
 */
ALTER TABLE [functional].[certificacao]
ADD CONSTRAINT [pkCertificacao] PRIMARY KEY CLUSTERED ([idCertificacao]);
GO

/**
 * @foreignKey fkCertificacao_Estabelecimento Relationship between certificacao and estabelecimento
 * @target functional.estabelecimento
 */
ALTER TABLE [functional].[certificacao]
ADD CONSTRAINT [fkCertificacao_Estabelecimento] FOREIGN KEY ([idEstabelecimento])
REFERENCES [functional].[estabelecimento]([idEstabelecimento]);
GO

/**
 * @index ixCertificacao_Estabelecimento_Data
 * @type Performance
 * @filter Optimizes date-ordered listing
 */
CREATE NONCLUSTERED INDEX [ixCertificacao_Estabelecimento_Data]
ON [functional].[certificacao]([idEstabelecimento], [dataCertificacao] DESC);
GO

/**
 * @table perguntaFrequente Brief: Perguntas frequentes sobre o estabelecimento
 * @multitenancy false
 * @softDelete false
 * @alias perFre
 */
CREATE TABLE [functional].[perguntaFrequente] (
  [idPerguntaFrequente] INTEGER IDENTITY(1, 1) NOT NULL,
  [idEstabelecimento] INTEGER NOT NULL,
  [pergunta] NVARCHAR(200) NOT NULL,
  [resposta] NVARCHAR(1000) NOT NULL,
  [categoria] NVARCHAR(50) NULL,
  [ordemExibicao] INTEGER NOT NULL DEFAULT (999)
);
GO

/**
 * @primaryKey pkPerguntaFrequente
 * @keyType Object
 */
ALTER TABLE [functional].[perguntaFrequente]
ADD CONSTRAINT [pkPerguntaFrequente] PRIMARY KEY CLUSTERED ([idPerguntaFrequente]);
GO

/**
 * @foreignKey fkPerguntaFrequente_Estabelecimento Relationship between perguntaFrequente and estabelecimento
 * @target functional.estabelecimento
 */
ALTER TABLE [functional].[perguntaFrequente]
ADD CONSTRAINT [fkPerguntaFrequente_Estabelecimento] FOREIGN KEY ([idEstabelecimento])
REFERENCES [functional].[estabelecimento]([idEstabelecimento]);
GO

/**
 * @index ixPerguntaFrequente_Estabelecimento_Categoria_Ordem
 * @type Performance
 * @filter Optimizes category-grouped ordered listing
 */
CREATE NONCLUSTERED INDEX [ixPerguntaFrequente_Estabelecimento_Categoria_Ordem]
ON [functional].[perguntaFrequente]([idEstabelecimento], [categoria], [ordemExibicao]);
GO

/**
 * @table imagemAcessibilidade Brief: Imagens dos recursos de acessibilidade
 * @multitenancy false
 * @softDelete false
 * @alias imgAce
 */
CREATE TABLE [functional].[imagemAcessibilidade] (
  [idImagemAcessibilidade] INTEGER IDENTITY(1, 1) NOT NULL,
  [idEstabelecimento] INTEGER NOT NULL,
  [urlImagem] NVARCHAR(500) NOT NULL,
  [legenda] NVARCHAR(200) NULL,
  [ordem] INTEGER NOT NULL DEFAULT (999)
);
GO

/**
 * @primaryKey pkImagemAcessibilidade
 * @keyType Object
 */
ALTER TABLE [functional].[imagemAcessibilidade]
ADD CONSTRAINT [pkImagemAcessibilidade] PRIMARY KEY CLUSTERED ([idImagemAcessibilidade]);
GO

/**
 * @foreignKey fkImagemAcessibilidade_Estabelecimento Relationship between imagemAcessibilidade and estabelecimento
 * @target functional.estabelecimento
 */
ALTER TABLE [functional].[imagemAcessibilidade]
ADD CONSTRAINT [fkImagemAcessibilidade_Estabelecimento] FOREIGN KEY ([idEstabelecimento])
REFERENCES [functional].[estabelecimento]([idEstabelecimento]);
GO

/**
 * @index ixImagemAcessibilidade_Estabelecimento_Ordem
 * @type Performance
 * @filter Optimizes ordered listing
 */
CREATE NONCLUSTERED INDEX [ixImagemAcessibilidade_Estabelecimento_Ordem]
ON [functional].[imagemAcessibilidade]([idEstabelecimento], [ordem]);
GO