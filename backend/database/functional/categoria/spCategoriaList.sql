/**
 * @summary
 * Lists all active categories with pastries available, ordered by display order
 *
 * @procedure spCategoriaList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/external/public/categoria
 *
 * @testScenarios
 * - Valid listing of all active categories
 * - Categories without active pastries should not appear
 * - Categories ordered by ordem field
 */
CREATE OR ALTER PROCEDURE [functional].[spCategoriaList]
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @output {CategoriaList, n, n}
   * @column {INT} idCategoria - Category identifier
   * @column {NVARCHAR} nome - Category name
   * @column {NVARCHAR} descricao - Category description
   * @column {NVARCHAR} icone - Category icon URL or name
   * @column {INT} ordem - Display order
   * @column {INT} totalPasteis - Total active pastries in category
   */
  SELECT
    [cat].[idCategoria],
    [cat].[nome],
    [cat].[descricao],
    [cat].[icone],
    [cat].[ordem],
    COUNT([pst].[idPastel]) AS [totalPasteis]
  FROM [functional].[categoria] [cat]
    LEFT JOIN [functional].[pastel] [pst] ON ([pst].[idCategoria] = [cat].[idCategoria] AND [pst].[disponivel] = 1)
  WHERE [cat].[ativa] = 1
  GROUP BY
    [cat].[idCategoria],
    [cat].[nome],
    [cat].[descricao],
    [cat].[icone],
    [cat].[ordem]
  HAVING COUNT([pst].[idPastel]) > 0
  ORDER BY
    [cat].[ordem],
    [cat].[nome];
END;
GO