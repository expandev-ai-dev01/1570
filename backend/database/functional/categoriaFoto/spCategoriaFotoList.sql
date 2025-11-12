/**
 * @summary
 * Lists all active photo categories with photo count, ordered by display order
 *
 * @procedure spCategoriaFotoList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/galeria/categoria
 *
 * @testScenarios
 * - Valid listing of all active photo categories
 * - Categories without active photos should not appear
 * - Categories ordered by ordem field
 */
CREATE OR ALTER PROCEDURE [functional].[spCategoriaFotoList]
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @output {CategoriaFotoList, n, n}
   * @column {INT} idCategoriaFoto - Photo category identifier
   * @column {NVARCHAR} nome - Category name
   * @column {NVARCHAR} descricao - Category description
   * @column {INT} ordem - Display order
   * @column {INT} quantidadeFotos - Total active photos in category
   * @column {DATETIME2} dataAtualizacao - Last update date
   */
  SELECT
    [catFot].[idCategoriaFoto],
    [catFot].[nome],
    [catFot].[descricao],
    [catFot].[ordem],
    COUNT([fot].[idFoto]) AS [quantidadeFotos],
    [catFot].[dataAtualizacao]
  FROM [functional].[categoriaFoto] [catFot]
    LEFT JOIN [functional].[foto] [fot] ON ([fot].[idCategoriaFoto] = [catFot].[idCategoriaFoto] AND [fot].[ativa] = 1)
  WHERE [catFot].[ativa] = 1
  GROUP BY
    [catFot].[idCategoriaFoto],
    [catFot].[nome],
    [catFot].[descricao],
    [catFot].[ordem],
    [catFot].[dataAtualizacao]
  HAVING COUNT([fot].[idFoto]) > 0
  ORDER BY
    [catFot].[ordem],
    [catFot].[nome];
END;
GO