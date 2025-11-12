/**
 * @summary
 * Retrieves detailed information about a specific photo by ID
 *
 * @procedure spFotoGet
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/galeria/foto/:id
 *
 * @parameters
 * @param {INT} idFoto
 *   - Required: Yes
 *   - Description: Photo identifier
 *
 * @testScenarios
 * - Valid retrieval with existing ID
 * - Error when photo doesn't exist
 * - Retrieve inactive photo
 */
CREATE OR ALTER PROCEDURE [functional].[spFotoGet]
  @idFoto INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate required parameter
   * @throw {idFotoRequired}
   */
  IF (@idFoto IS NULL)
  BEGIN
    ;THROW 51000, 'idFotoRequired', 1;
  END;

  /**
   * @validation Validate photo exists
   * @throw {fotoDoesntExist}
   */
  IF NOT EXISTS (SELECT * FROM [functional].[foto] WHERE [idFoto] = @idFoto)
  BEGIN
    ;THROW 51000, 'fotoDoesntExist', 1;
  END;

  /**
   * @output {FotoDetail, 1, n}
   * @column {INT} idFoto - Photo identifier
   * @column {INT} idCategoriaFoto - Photo category identifier
   * @column {NVARCHAR} categoriaNome - Category name
   * @column {NVARCHAR} titulo - Photo title
   * @column {NVARCHAR} descricao - Photo description
   * @column {NVARCHAR} urlFoto - Photo URL (full size)
   * @column {NVARCHAR} urlMiniatura - Thumbnail URL
   * @column {DATE} dataFoto - Photo date
   * @column {NVARCHAR} creditos - Photo credits
   * @column {BIT} ativa - Active status
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
    [fot].[creditos],
    [fot].[ativa]
  FROM [functional].[foto] [fot]
    JOIN [functional].[categoriaFoto] [catFot] ON ([catFot].[idCategoriaFoto] = [fot].[idCategoriaFoto])
  WHERE [fot].[idFoto] = @idFoto;
END;
GO