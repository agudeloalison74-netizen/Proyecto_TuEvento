-- =============================================================================
-- 1. GET /api/v1/eventos/busqueda
-- OBJETIVO: Filtrar eventos por ubicación (ciudad) y categoría.
-- =============================================================================
SELECT 
    ev.id_evento,
    ev.nombre_evento,
    ev.descripcion_evento,
    cat.nombre_categoria,
    emp.nombre_empresa,
    c.nombre_ciudad,
    dep.nombre_departamento
FROM evento ev
JOIN categoria cat ON ev.id_categoria = cat.id_categoria
JOIN empresa emp ON ev.id_empresa = emp.id_empresa
JOIN ciudad c ON emp.id_ciudad = c.id_ciudad
JOIN departamento dep ON c.id_departamento = dep.id_departamento
WHERE c.nombre_ciudad = 'Medellín' 
  AND cat.nombre_categoria = 'Conciertos y Festivales';

-- =============================================================================
-- 2. GET /api/v1/empresas/:id_empresa/servicios
-- OBJETIVO: Cargar el portafolio público de servicios de una empresa.
-- USO: Vista de perfil del proveedor con imágenes/muestras de su trabajo.
-- =============================================================================
SELECT 
    emp.nombre_empresa,
    emp.contacto_empresa,
    s.id_servicio,
    s.nombre_servicio,
    s.descripcion_servicio,
    s.precio_referencia,
    m.url AS url_muestra,
    m.descripcion_muestra
FROM empresa emp
JOIN servicio s ON emp.id_empresa = s.id_empresa
LEFT JOIN muestra m ON s.id_servicio = m.id_servicio
WHERE emp.id_empresa = '900888777-2'
ORDER BY s.nombre_servicio;


-- =============================================================================
-- 3. GET /api/v1/usuarios/:id_usuario/reservas
-- OBJETIVO: Listar el historial y estado de reservas de un cliente.
-- USO: Sección "Mis Reservas" dentro del panel del usuario.
-- =============================================================================
SELECT 
    r.id_reserva,
    r.fecha_hora AS fecha_reserva,
    r.estado AS estado_reserva,
    r.precio_total,
    emp.nombre_empresa,
    emp.contacto_empresa,
    STRING_AGG(s.nombre_servicio, ', ') AS servicios_contratados
FROM reserva r
JOIN servicio_reserva sr ON r.id_reserva = sr.id_reserva
JOIN servicio s ON sr.id_servicio = s.id_servicio
JOIN empresa emp ON s.id_empresa = emp.id_empresa
WHERE r.id_usuario = 4
GROUP BY r.id_reserva, r.fecha_hora, r.estado, r.precio_total, emp.nombre_empresa, emp.contacto_empresa
ORDER BY r.fecha_hora DESC;


-- =============================================================================
-- 4. GET /api/v1/servicios/:id_servicio/disponibilidad
-- OBJETIVO: Consultar fechas y horas disponibles de un servicio.
-- USO: Calendario/Picker de fechas antes de confirmar una reserva.
-- =============================================================================
SELECT 
    s.id_servicio,
    s.nombre_servicio,
    d.id_disponibilidad,
    d.fecha_hora AS agenda_disponible,
    d.estado
FROM servicio s
JOIN disponibilidad d ON s.id_servicio = d.id_servicio
WHERE s.id_servicio = 3
  AND d.estado = 'Disponible'
ORDER BY d.fecha_hora ASC;


-- =============================================================================
-- 5. GET /api/v1/empresas/:id_empresa/resenas
-- OBJETIVO: RESEÑAS DE EMPRESA
-- =============================================================================
SELECT 
    res.id_resena,
    res.fecha_resena,
    res.descripcion_resena,
    CONCAT(u.nombre_usuario, ' ', u.apellido_usuario) AS nombre_cliente
FROM resena res
JOIN reserva r ON res.id_reserva = r.id_reserva
JOIN usuario u ON r.id_usuario = u.id_usuario
JOIN servicio_reserva sr ON r.id_reserva = sr.id_reserva
JOIN servicio s ON sr.id_servicio = s.id_servicio
WHERE s.id_empresa = '900555444-3'
GROUP BY res.id_resena, res.fecha_resena, res.descripcion_resena, u.nombre_usuario, u.apellido_usuario
ORDER BY res.fecha_resena DESC;


-- =============================================================================
-- 6. GET /api/v1/dashboard/proveedor/:id_empresa/metricas
-- OBJETIVO: Calcular las ganancias e ingresos totales de una empresa.
-- USO: Dashboard administrativo interno del proveedor/empresa.
-- =============================================================================
SELECT 
    emp.id_empresa,
    emp.nombre_empresa,
    COUNT(DISTINCT r.id_reserva) AS reservas_confirmadas,
    COALESCE(SUM(s.precio_referencia), 0) AS ingresos_totales
FROM empresa emp
JOIN servicio s ON emp.id_empresa = s.id_empresa
JOIN servicio_reserva sr ON s.id_servicio = sr.id_servicio
JOIN reserva r ON sr.id_reserva = r.id_reserva
WHERE emp.id_empresa = '900888777-2'
  AND r.estado IN ('ACEPTADA', 'CONFIRMADA')
GROUP BY emp.id_empresa, emp.nombre_empresa;