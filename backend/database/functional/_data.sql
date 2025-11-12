/**
 * @load categoria
 */
INSERT INTO [functional].[categoria]
([nome], [descricao], [icone], [ordem], [ativa])
VALUES
('Salgados', 'Pastéis salgados tradicionais', NULL, 1, 1),
('Doces', 'Pastéis doces e sobremesas', NULL, 2, 1),
('Especiais', 'Pastéis especiais da casa', NULL, 3, 1);
GO