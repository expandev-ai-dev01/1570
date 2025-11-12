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

/**
 * @load categoriaFoto
 */
INSERT INTO [functional].[categoriaFoto]
([nome], [descricao], [ordem], [ativa])
VALUES
('Pastéis', 'Fotos dos nossos deliciosos pastéis', 1, 1),
('Ambiente', 'Fotos do ambiente da pastelaria', 2, 1),
('Eventos', 'Fotos de eventos realizados no local', 3, 1),
('Equipe', 'Fotos da nossa equipe', 4, 1);
GO