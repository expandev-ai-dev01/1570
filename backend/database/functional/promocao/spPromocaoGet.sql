/**
 * @summary
 * Retrieves detailed information about a specific promotion by ID
 *
 * @procedure spPromocaoGet
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/promocao/:id
 *
 * @parameters
 * @param {INT} idPromocao
 *   - Required: Yes
 *   - Description: Promotion identifier
 *
 * @testScenarios
 * - Valid retrieval with existing ID
 * - Error when promotion doesn't exist
 * - Calculate days remaining for active promotions
 */
CREATE OR ALTER PROCEDURE [functional].[spPromocaoGet]
  @idPromocao INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate required parameter
   * @throw {idPromocaoRequired}
   */
  IF (@idPromocao IS NULL)
  BEGIN
    ;THROW 51000, 'idPromocaoRequired', 1;
  END;

  /**
   * @validation Validate promotion exists
   * @throw {promocaoDoesntExist}
   */
  IF NOT EXISTS (SELECT * FROM [functional].[promocao] WHERE [idPromocao] = @idPromocao)
  BEGIN
    ;THROW 51000, 'promocaoDoesntExist', 1;
  END;

  /**
   * @output {PromocaoDetail, 1, n}
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
   * @column {DATETIME2} dataCriacao - Creation date
   * @column {DATETIME2} dataAtualizacao - Last update date
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
    END AS [diasRestantes],
    [prm].[dataCriacao],
    [prm].[dataAtualizacao]
  FROM [functional].[promocao] [prm]
  WHERE [prm].[idPromocao] = @idPromocao;
END;
GO