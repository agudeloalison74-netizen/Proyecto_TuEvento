-- =========================================================
-- CONSULTAS Y OPERACIONES DIVERSAS (FILTROS Y REPORTES)
-- =========================================================

-- Detalle Completo de Reservas y Servicios Contratados
SELECT 
    r.id_reserva,
    r.fecha_hora AS fecha_evento,
    r.estado AS estado_reserva,
    r.precio_total,
    CONCAT(u.nombre_usuario, ' ', u.apellido_usuario) AS cliente,
    u.correo_usuario,
    emp.nombre_empresa,
    COALESCE(ev.nombre_evento, 'Sin Evento Definido') AS nombre_evento,
    s.nombre_servicio,
    s.precio_referencia AS precio_servicio
FROM reserva r
JOIN usuario u ON r.id_usuario = u.id_usuario
JOIN servicio_reserva sr ON r.id_reserva = sr.id_reserva
JOIN servicio s ON sr.id_servicio = s.id_servicio
JOIN empresa emp ON s.id_empresa = emp.id_empresa
LEFT JOIN evento ev ON sr.id_evento = ev.id_evento
ORDER BY r.fecha_hora DESC;

-- Catálogo Ofertado por Empresa y Ubicación
SELECT 
    emp.nombre_empresa,
    emp.id_empresa AS nit,
    c.nombre_ciudad,
    dep.nombre_departamento,
    s.nombre_servicio,
    s.descripcion_servicio,
    s.precio_referencia
FROM servicio s
JOIN empresa emp ON s.id_empresa = emp.id_empresa
JOIN ciudad c ON emp.id_ciudad = c.id_ciudad
JOIN departamento dep ON c.id_departamento = dep.id_departamento
ORDER BY emp.nombre_empresa, s.nombre_servicio;

--Agenda de Servicios Disponibles
SELECT 
    s.id_servicio,
    s.nombre_servicio,
    emp.nombre_empresa,
    d.fecha_hora AS fecha_disponible,
    d.estado AS estado_disponibilidad
FROM servicio s
JOIN empresa emp ON s.id_empresa = emp.id_empresa
JOIN disponibilidad d ON s.id_servicio = d.id_servicio
WHERE d.estado = 'Disponible'
ORDER BY d.fecha_hora ASC;

-- Reseñas de Clientes por Empresa
SELECT 
    res.id_resena,
    res.fecha_resena,
    res.descripcion_resena,
    CONCAT(u.nombre_usuario, ' ', u.apellido_usuario) AS cliente,
    r.id_reserva,
    emp.nombre_empresa
FROM resena res
JOIN reserva r ON res.id_reserva = r.id_reserva
JOIN usuario u ON r.id_usuario = u.id_usuario
JOIN servicio_reserva sr ON r.id_reserva = sr.id_reserva
JOIN servicio s ON sr.id_servicio = s.id_servicio
JOIN empresa emp ON s.id_empresa = emp.id_empresa
GROUP BY res.id_resena, res.fecha_resena, res.descripcion_resena, u.nombre_usuario, u.apellido_usuario, r.id_reserva, emp.nombre_empresa
ORDER BY res.fecha_resena DESC;

--Reporte de Ingresos Totales por Empresa
SELECT 
    emp.id_empresa AS nit,
    emp.nombre_empresa,
    COUNT(DISTINCT r.id_reserva) AS total_reservas,
    SUM(s.precio_referencia) AS ingresos_totales
FROM empresa emp
JOIN servicio s ON emp.id_empresa = s.id_empresa
JOIN servicio_reserva sr ON s.id_servicio = sr.id_servicio
JOIN reserva r ON sr.id_reserva = r.id_reserva
WHERE r.estado IN ('ACEPTADA', 'CONFIRMADA')
GROUP BY emp.id_empresa, emp.nombre_empresa
ORDER BY ingresos_totales DESC;

-- Catálogo de Eventos con Evidencia Multimedia (Muestras)
SELECT 
    ev.nombre_evento,
    cat.nombre_categoria,
    emp.nombre_empresa,
    s.nombre_servicio,
    m.url AS url_muestra,
    m.descripcion_muestra
FROM evento ev
JOIN categoria cat ON ev.id_categoria = cat.id_categoria
JOIN empresa emp ON ev.id_empresa = emp.id_empresa
JOIN servicio_evento se ON ev.id_evento = se.id_evento
JOIN servicio s ON se.id_servicio = s.id_servicio
LEFT JOIN muestra m ON s.id_servicio = m.id_servicio;