-- =========================================================
-- SCRIPT DE VERIFICACIÓN GENERAL DE DATOS
-- =========================================================
SELECT 'Departamentos' AS Tabla, COUNT(*) AS Total FROM departamento
UNION ALL SELECT 'Ciudades', COUNT(*) FROM ciudad
UNION ALL SELECT 'Usuarios', COUNT(*) FROM usuario
UNION ALL SELECT 'Empresas', COUNT(*) FROM empresa
UNION ALL SELECT 'Servicios', COUNT(*) FROM servicio
UNION ALL SELECT 'Reservas', COUNT(*) FROM reserva
UNION ALL SELECT 'Servicio_Reserva', COUNT(*) FROM servicio_reserva
UNION ALL SELECT 'Reseñas', COUNT(*) FROM resena;