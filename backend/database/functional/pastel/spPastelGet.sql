/**
 * @summary
 * Retrieves detailed information about a specific pastel by ID
 *
 * @procedure spPastelGet
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/pastel/:id
 *
 * @parameters
 * @param {INT} idPastel
 *   - Required: Yes
 *   - Description: Pastel identifier
 *
 * @testScenarios
 * - Valid retrieval with existing ID
 * - Error when pastel doesn't exist
 * - Retrieve unavailable pastel with reason
 */
CREATE OR ALTER PROCEDURE [functional].[spPastelGet]
  @idPastel INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate required parameter
   * @throw {idPastelRequired}
   */
  IF (@idPastel IS NULL)
  BEGIN
    ;THROW 51000, 'idPastelRequired', 1;
  END;

  /**
   * @validation Validate pastel exists
   * @throw {pastelDoesntExist}
   */
  IF NOT EXISTS (SELECT * FROM [functional].[pastel] WHERE [idPastel] = @idPastel)
  BEGIN
    ;THROW 51000, 'pastelDoesntExist', 1;
  END;

  /**
   * @output {PastelDetail, 1, n}
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
  WHERE [pst].[idPastel] = @idPastel;
END;
GO