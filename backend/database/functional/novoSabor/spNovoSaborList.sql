/**
 * @summary
 * Lists new flavors with pastel details, filtering by active novelty period.
 * Supports filtering by home highlight.
 *
 * @procedure spNovoSaborList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/novo-sabor
 *
 * @parameters
 * @param {BIT} apenasDestaqueHome
 *   - Required: No
 *   - Description: Filter only home highlighted new flavors
 *
 * @testScenarios
 * - Valid listing of all new flavors within novelty period
 * - Filter only home highlighted flavors
 * - Exclude flavors past novelty period
 * - Include pastel details (name, description, price, image)
 */
CREATE OR ALTER PROCEDURE [functional].[spNovoSaborList]
  @apenasDestaqueHome BIT = 0
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @output {NovoSaborList, n, n}
   * @column {INT} idNovoSabor - New flavor identifier
   * @column {INT} idPastel - Pastel identifier
   * @column {NVARCHAR} nomePastel - Pastel name
   * @column {NVARCHAR} descricaoPastel - Pastel description
   * @column {NUMERIC} precoPastel - Pastel price
   * @column {NVARCHAR} imagemPastel - Pastel image URL
   * @column {NVARCHAR} categoriaNome - Category name
   * @column {DATE} dataAdicao - Addition date
   * @column {INT} periodoNovidade - Novelty period in days
   * @column {BIT} destaqueHome - Home highlight flag
   * @column {INT} diasRestantes - Days remaining in novelty period
   */
  SELECT
    [novSab].[idNovoSabor],
    [pst].[idPastel],
    [pst].[nome] AS [nomePastel],
    [pst].[descricao] AS [descricaoPastel],
    [pst].[preco] AS [precoPastel],
    [pst].[imagemUrl] AS [imagemPastel],
    [cat].[nome] AS [categoriaNome],
    [novSab].[dataAdicao],
    [novSab].[periodoNovidade],
    [novSab].[destaqueHome],
    [novSab].[periodoNovidade] - DATEDIFF(DAY, [novSab].[dataAdicao], CAST(GETUTCDATE() AS DATE)) AS [diasRestantes]
  FROM [functional].[novoSabor] [novSab]
    JOIN [functional].[pastel] [pst] ON ([pst].[idPastel] = [novSab].[idPastel])
    JOIN [functional].[categoria] [cat] ON ([cat].[idCategoria] = [pst].[idCategoria])
  WHERE
    ([pst].[disponivel] = 1)
    AND ([cat].[ativa] = 1)
    AND (DATEDIFF(DAY, [novSab].[dataAdicao], CAST(GETUTCDATE() AS DATE)) <= [novSab].[periodoNovidade])
    AND (@apenasDestaqueHome = 0 OR [novSab].[destaqueHome] = 1)
  ORDER BY
    [novSab].[destaqueHome] DESC,
    [novSab].[dataAdicao] DESC,
    [pst].[nome];
END;
GO