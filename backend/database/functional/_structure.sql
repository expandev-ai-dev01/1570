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