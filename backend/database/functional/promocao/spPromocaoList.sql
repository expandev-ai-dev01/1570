/**
 * @summary
 * Lists promotions with optional filtering by status, category, and date range.
 * Supports ordering by start date.
 *
 * @procedure spPromocaoList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/promocao
 *
 * @parameters
 * @param {VARCHAR} status
 *   - Required: No
 *   - Description: Filter by promotion status (agendada, ativa, encerrada)
 *
 * @param {VARCHAR} categoria
 *   - Required: No
 *   - Description: Filter by promotion category
 *
 * @param {DATE} dataInicio
 *   - Required: No
 *   - Description: Start date for date range filter
 *
 * @param {DATE} dataFim
 *   - Required: No
 *   - Description: End date for date range filter
 *
 * @param {BIT} apenasDestaque
 *   - Required: No
 *   - Description: Filter only featured promotions
 *
 * @testScenarios
 * - Valid listing without filters
 * - Filter by status (ativa, agendada, encerrada)
 * - Filter by category
 * - Filter by date range
 * - Filter only featured promotions
 * - Combined filters
 * - Invalid status parameter
 * - Invalid category parameter
 */
CREATE OR ALTER PROCEDURE [functional].[spPromocaoList]
  @status VARCHAR(20) = NULL,
  @categoria VARCHAR(20) = NULL,
  @dataInicio DATE = NULL,
  @dataFim DATE = NULL,
  @apenasDestaque BIT = 0
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate status parameter
   * @throw {invalidStatus}
   */
  IF (@status IS NOT NULL AND @status NOT IN ('agendada', 'ativa', 'encerrada'))
  BEGIN
    ;THROW 51000, 'invalidStatus', 1;
  END;

  /**
   * @validation Validate categoria parameter
   * @throw {invalidCategoria}
   */
  IF (@categoria IS NOT NULL AND @categoria NOT IN ('diaria', 'semanal', 'sazonal', 'data_comemorativa'))
  BEGIN
    ;THROW 51000, 'invalidCategoria', 1;
  END;

  /**
   * @validation Validate date range
   * @throw {dataFimMustBeGreaterThanOrEqualDataInicio}
   */
  IF (@dataInicio IS NOT NULL AND @dataFim IS NOT NULL AND @dataFim < @dataInicio)
  BEGIN
    ;THROW 51000, 'dataFimMustBeGreaterThanOrEqualDataInicio', 1;
  END;

  /**
   * @output {PromocaoList, n, n}
   * @column {INT} idPromocao - Promotion identifier
   * @column {NVARCHAR} titulo - Promotion title
   * @column {NVARCHAR} descricao - Promotion description
   * @column {DATE} dataInicio - Start date
   * @column {DATE} dataTermino - End date
   * @column {VARCHAR} categoria - Promotion category
   * @column {NUMERIC} desconto - Discount percentage
   * @column {NUMERIC} valorPromocional - Promotional value
   * @column {NVARCHAR} imagemUrl - Image URL
   * @column {VARCHAR} status - Promotion status
   * @column {NVARCHAR} termosCondicoes - Terms and conditions
   * @column {BIT} destaque - Featured flag
   * @column {INT} diasRestantes - Days remaining (for active promotions)
   */
  SELECT
    [prm].[idPromocao],
    [prm].[titulo],
    [prm].[descricao],
    [prm].[dataInicio],
    [prm].[dataTermino],
    [prm].[categoria],
    [prm].[desconto],
    [prm].[valorPromocional],
    [prm].[imagemUrl],
    [prm].[status],
    [prm].[termosCondicoes],
    [prm].[destaque],
    CASE
      WHEN [prm].[status] = 'ativa' THEN DATEDIFF(DAY, CAST(GETUTCDATE() AS DATE), [prm].[dataTermino])
      ELSE NULL
    END AS [diasRestantes]
  FROM [functional].[promocao] [prm]
  WHERE
    (@status IS NULL OR [prm].[status] = @status)
    AND (@categoria IS NULL OR [prm].[categoria] = @categoria)
    AND (@dataInicio IS NULL OR [prm].[dataTermino] >= @dataInicio)
    AND (@dataFim IS NULL OR [prm].[dataInicio] <= @dataFim)
    AND (@apenasDestaque = 0 OR [prm].[destaque] = 1)
  ORDER BY
    [prm].[destaque] DESC,
    [prm].[dataInicio] DESC,
    [prm].[titulo];
END;
GO