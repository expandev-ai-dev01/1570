/**
 * @summary
 * Lists photos with optional filtering by category and date range.
 * Supports ordering by date (most recent or oldest).
 *
 * @procedure spFotoList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/galeria/foto
 *
 * @parameters
 * @param {INT} idCategoriaFoto
 *   - Required: No
 *   - Description: Filter by photo category ID
 *
 * @param {DATE} dataInicio
 *   - Required: No
 *   - Description: Start date for date range filter
 *
 * @param {DATE} dataFim
 *   - Required: No
 *   - Description: End date for date range filter
 *
 * @param {NVARCHAR} ordenacao
 *   - Required: No
 *   - Description: Sort order (mais_recentes, mais_antigas)
 *
 * @testScenarios
 * - Valid listing without filters
 * - Filter by single category
 * - Filter by date range
 * - Combined filters
 * - Different ordering options
 * - Invalid date range (dataFim < dataInicio)
 */
CREATE OR ALTER PROCEDURE [functional].[spFotoList]
  @idCategoriaFoto INTEGER = NULL,
  @dataInicio DATE = NULL,
  @dataFim DATE = NULL,
  @ordenacao NVARCHAR(20) = 'mais_recentes'
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate date range
   * @throw {dataFimMustBeGreaterThanOrEqualDataInicio}
   */
  IF (@dataInicio IS NOT NULL AND @dataFim IS NOT NULL AND @dataFim < @dataInicio)
  BEGIN
    ;THROW 51000, 'dataFimMustBeGreaterThanOrEqualDataInicio', 1;
  END;

  /**
   * @validation Validate ordering parameter
   * @throw {invalidOrdenacao}
   */
  IF (@ordenacao NOT IN ('mais_recentes', 'mais_antigas'))
  BEGIN
    ;THROW 51000, 'invalidOrdenacao', 1;
  END;

  /**
   * @output {FotoList, n, n}
   * @column {INT} idFoto - Photo identifier
   * @column {INT} idCategoriaFoto - Photo category identifier
   * @column {NVARCHAR} categoriaNome - Category name
   * @column {NVARCHAR} titulo - Photo title
   * @column {NVARCHAR} descricao - Photo description
   * @column {NVARCHAR} urlFoto - Photo URL (full size)
   * @column {NVARCHAR} urlMiniatura - Thumbnail URL
   * @column {DATE} dataFoto - Photo date
   * @column {NVARCHAR} creditos - Photo credits
   */
  SELECT
    [fot].[idFoto],
    [fot].[idCategoriaFoto],
    [catFot].[nome] AS [categoriaNome],
    [fot].[titulo],
    [fot].[descricao],
    [fot].[urlFoto],
    [fot].[urlMiniatura],
    [fot].[dataFoto],
    [fot].[creditos]
  FROM [functional].[foto] [fot]
    JOIN [functional].[categoriaFoto] [catFot] ON ([catFot].[idCategoriaFoto] = [fot].[idCategoriaFoto])
  WHERE
    ([fot].[ativa] = 1)
    AND ([catFot].[ativa] = 1)
    AND (@idCategoriaFoto IS NULL OR [fot].[idCategoriaFoto] = @idCategoriaFoto)
    AND (@dataInicio IS NULL OR [fot].[dataFoto] >= @dataInicio)
    AND (@dataFim IS NULL OR [fot].[dataFoto] <= @dataFim)
  ORDER BY
    CASE WHEN @ordenacao = 'mais_recentes' THEN [fot].[dataFoto] END DESC,
    CASE WHEN @ordenacao = 'mais_antigas' THEN [fot].[dataFoto] END ASC,
    [fot].[ordem],
    [fot].[titulo];
END;
GO