/**
 * @summary
 * Lists pastries with optional filtering by category, price range, ingredient,
 * dietary restriction, and availability. Supports multiple ordering options.
 *
 * @procedure spPastelList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/pastel
 *
 * @parameters
 * @param {INT} idCategoria
 *   - Required: No
 *   - Description: Filter by category ID
 *
 * @param {NUMERIC} precoMin
 *   - Required: No
 *   - Description: Minimum price filter
 *
 * @param {NUMERIC} precoMax
 *   - Required: No
 *   - Description: Maximum price filter
 *
 * @param {NVARCHAR} ingrediente
 *   - Required: No
 *   - Description: Filter by ingredient (partial match, case-insensitive)
 *
 * @param {NVARCHAR} restricao
 *   - Required: No
 *   - Description: Filter by dietary restriction (vegetariano, vegano, sem_gluten, sem_lactose)
 *
 * @param {BIT} apenasDisponiveis
 *   - Required: No
 *   - Description: Filter only available pastries (default: 1)
 *
 * @param {NVARCHAR} ordenacao
 *   - Required: No
 *   - Description: Sort order (preco_asc, preco_desc, nome_asc, nome_desc, popularidade)
 *
 * @testScenarios
 * - Valid listing without filters
 * - Filter by single category
 * - Filter by price range
 * - Filter by ingredient
 * - Filter by dietary restriction
 * - Combined filters
 * - Different ordering options
 * - Include/exclude unavailable items
 */
CREATE OR ALTER PROCEDURE [functional].[spPastelList]
  @idCategoria INTEGER = NULL,
  @precoMin NUMERIC(18, 6) = NULL,
  @precoMax NUMERIC(18, 6) = NULL,
  @ingrediente NVARCHAR(100) = NULL,
  @restricao NVARCHAR(50) = NULL,
  @apenasDisponiveis BIT = 1,
  @ordenacao NVARCHAR(20) = 'nome_asc'
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate price range
   * @throw {precoMaxMustBeGreaterThanPrecoMin}
   */
  IF (@precoMin IS NOT NULL AND @precoMax IS NOT NULL AND @precoMax < @precoMin)
  BEGIN
    ;THROW 51000, 'precoMaxMustBeGreaterThanPrecoMin', 1;
  END;

  /**
   * @validation Validate ordering parameter
   * @throw {invalidOrdenacao}
   */
  IF (@ordenacao NOT IN ('preco_asc', 'preco_desc', 'nome_asc', 'nome_desc', 'popularidade'))
  BEGIN
    ;THROW 51000, 'invalidOrdenacao', 1;
  END;

  /**
   * @validation Validate dietary restriction parameter
   * @throw {invalidRestricao}
   */
  IF (@restricao IS NOT NULL AND @restricao NOT IN ('vegetariano', 'vegano', 'sem_gluten', 'sem_lactose'))
  BEGIN
    ;THROW 51000, 'invalidRestricao', 1;
  END;

  /**
   * @output {PastelList, n, n}
   * @column {INT} idPastel - Pastel identifier
   * @column {INT} idCategoria - Category identifier
   * @column {NVARCHAR} categoriaNome - Category name
   * @column {NVARCHAR} nome - Pastel name
   * @column {NVARCHAR} descricao - Pastel description
   * @column {NUMERIC} preco - Pastel price
   * @column {NVARCHAR} imagemUrl - Image URL
   * @column {BIT} disponivel - Availability status
   * @column {BIT} destaque - Highlight status
   * @column {NVARCHAR} ingredientes - Ingredients JSON array
   * @column {NVARCHAR} alergenicos - Allergens JSON array
   * @column {NVARCHAR} infoNutricional - Nutritional info JSON object
   * @column {NVARCHAR} restricoes - Dietary restrictions JSON array
   * @column {NVARCHAR} motivoIndisponibilidade - Unavailability reason
   * @column {DATETIME2} previsaoDisponibilidade - Availability forecast
   */
  SELECT
    [pst].[idPastel],
    [pst].[idCategoria],
    [cat].[nome] AS [categoriaNome],
    [pst].[nome],
    [pst].[descricao],
    [pst].[preco],
    [pst].[imagemUrl],
    [pst].[disponivel],
    [pst].[destaque],
    [pst].[ingredientes],
    [pst].[alergenicos],
    [pst].[infoNutricional],
    [pst].[restricoes],
    [pst].[motivoIndisponibilidade],
    [pst].[previsaoDisponibilidade]
  FROM [functional].[pastel] [pst]
    JOIN [functional].[categoria] [cat] ON ([cat].[idCategoria] = [pst].[idCategoria])
  WHERE
    ([cat].[ativa] = 1)
    AND (@idCategoria IS NULL OR [pst].[idCategoria] = @idCategoria)
    AND (@precoMin IS NULL OR [pst].[preco] >= @precoMin)
    AND (@precoMax IS NULL OR [pst].[preco] <= @precoMax)
    AND (@ingrediente IS NULL OR [pst].[ingredientes] LIKE '%' + @ingrediente + '%')
    AND (@restricao IS NULL OR [pst].[restricoes] LIKE '%' + @restricao + '%')
    AND (@apenasDisponiveis = 0 OR [pst].[disponivel] = 1)
  ORDER BY
    CASE WHEN @ordenacao = 'popularidade' THEN [pst].[destaque] END DESC,
    CASE WHEN @ordenacao = 'preco_asc' THEN [pst].[preco] END ASC,
    CASE WHEN @ordenacao = 'preco_desc' THEN [pst].[preco] END DESC,
    CASE WHEN @ordenacao = 'nome_asc' THEN [pst].[nome] END ASC,
    CASE WHEN @ordenacao = 'nome_desc' THEN [pst].[nome] END DESC,
    [pst].[disponivel] DESC,
    [pst].[destaque] DESC,
    [pst].[nome] ASC;
END;
GO