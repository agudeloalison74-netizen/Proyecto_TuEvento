
-- =========================================================
-- TUEVENTO: INSERCION DE DATOS DE PRUEBA
-- =========================================================

BEGIN;

DO $$
DECLARE
    -- Departamentos y ciudades
    dep_cundinamarca INT;
    dep_antioquia INT;
    dep_valle INT;
    ciudad_bogota INT;
    ciudad_medellin INT;
    ciudad_cali INT;

    -- Usuarios
    usr_carlos INT;
    usr_ana INT;
    usr_laura INT;
    usr_david INT;
    usr_elena INT;
    usr_fernando INT;
    usr_sofia INT;

    -- Categorias
    cat_sociales INT;
    cat_corporativos INT;
    cat_conciertos INT;
    cat_quince INT;

    -- Disponibilidades
    disp1 INT;
    disp2 INT;
    disp3 INT;
    disp4 INT;
    disp5 INT;
    disp6 INT;

    -- Servicios
    serv_catering INT;
    serv_sonido INT;
    serv_pantallas INT;
    serv_decoracion INT;
    serv_bebidas INT;
    serv_buffet INT;

    -- Eventos
    ev_lanzamiento INT;
    ev_quince INT;
    ev_boda INT;

    -- Reservas
    res_carlos INT;
    res_laura INT;
    res_sofia INT;

BEGIN

    -- =====================================================
    -- 1. DEPARTAMENTOS Y CIUDADES
    -- =====================================================

    INSERT INTO departamento (nombre_departamento)
    VALUES ('Cundinamarca')
    RETURNING id_departamento INTO dep_cundinamarca;

    INSERT INTO departamento (nombre_departamento)
    VALUES ('Antioquia')
    RETURNING id_departamento INTO dep_antioquia;

    INSERT INTO departamento (nombre_departamento)
    VALUES ('Valle del Cauca')
    RETURNING id_departamento INTO dep_valle;

    INSERT INTO ciudad (nombre_ciudad, id_departamento)
    VALUES ('Bogota', dep_cundinamarca)
    RETURNING id_ciudad INTO ciudad_bogota;

    INSERT INTO ciudad (nombre_ciudad, id_departamento)
    VALUES ('Medellin', dep_antioquia)
    RETURNING id_ciudad INTO ciudad_medellin;

    INSERT INTO ciudad (nombre_ciudad, id_departamento)
    VALUES ('Cali', dep_valle)
    RETURNING id_ciudad INTO ciudad_cali;


    -- =====================================================
    -- 2. USUARIOS
    -- =====================================================

    INSERT INTO usuario
    (nombre_usuario, apellido_usuario, correo_usuario,
     telefono_usuario, contrasena_usuario, rol)
    VALUES
    ('Carlos', 'Ramirez', 'carlos.ramirez@email.com',
     '3001234567', 'pass123', 'Cliente')
    RETURNING id_usuario INTO usr_carlos;

    INSERT INTO usuario
    (nombre_usuario, apellido_usuario, correo_usuario,
     telefono_usuario, contrasena_usuario, rol)
    VALUES
    ('Ana', 'Martinez', 'ana.martinez@email.com',
     '3109876543', 'pass456', 'Empresa')
    RETURNING id_usuario INTO usr_ana;

    INSERT INTO usuario
    (nombre_usuario, apellido_usuario, correo_usuario,
     telefono_usuario, contrasena_usuario, rol)
    VALUES
    ('Laura', 'Gomez', 'laura.gomez@email.com',
     '3205554433', 'pass789', 'Cliente')
    RETURNING id_usuario INTO usr_laura;

    INSERT INTO usuario
    (nombre_usuario, apellido_usuario, correo_usuario,
     telefono_usuario, contrasena_usuario, rol)
    VALUES
    ('David', 'Sanchez', 'david.sanchez@email.com',
     '3151112233', 'pass111', 'Cliente')
    RETURNING id_usuario INTO usr_david;

    INSERT INTO usuario
    (nombre_usuario, apellido_usuario, correo_usuario,
     telefono_usuario, contrasena_usuario, rol)
    VALUES
    ('Elena', 'Torres', 'elena.torres@email.com',
     '3184445566', 'pass222', 'Empresa')
    RETURNING id_usuario INTO usr_elena;

    INSERT INTO usuario
    (nombre_usuario, apellido_usuario, correo_usuario,
     telefono_usuario, contrasena_usuario, rol)
    VALUES
    ('Fernando', 'Ruiz', 'fernando.ruiz@email.com',
     '3017778899', 'pass333', 'Empresa')
    RETURNING id_usuario INTO usr_fernando;

    INSERT INTO usuario
    (nombre_usuario, apellido_usuario, correo_usuario,
     telefono_usuario, contrasena_usuario, rol)
    VALUES
    ('Sofia', 'Castro', 'sofia.castro@email.com',
     '3129990011', 'pass444', 'Cliente')
    RETURNING id_usuario INTO usr_sofia;


    -- =====================================================
    -- 3. EMPRESAS
    -- =====================================================

    INSERT INTO empresa
    (id_empresa, nombre_empresa, descripcion_empresa,
     contacto_empresa, direccion_empresa, id_ciudad, id_usuario)
    VALUES
    ('900123456-1', 'Eventos Elite S.A.S.',
     'Organizacion y logistica integral de eventos',
     'Ana Martinez', 'Calle 100 #15-20',
     ciudad_bogota, usr_ana);

    INSERT INTO empresa
    (id_empresa, nombre_empresa, descripcion_empresa,
     contacto_empresa, direccion_empresa, id_ciudad, id_usuario)
    VALUES
    ('900888777-2', 'Antioquia Sound & Lights',
     'Especialistas en produccion tecnica audiovisual',
     'Elena Torres', 'Carrera 43A #10-12',
     ciudad_medellin, usr_elena);

    INSERT INTO empresa
    (id_empresa, nombre_empresa, descripcion_empresa,
     contacto_empresa, direccion_empresa, id_ciudad, id_usuario)
    VALUES
    ('900555444-3', 'Catering & Gourmet Valluno',
     'Servicios de alimentacion para eventos',
     'Fernando Ruiz', 'Avenida 6N #22-45',
     ciudad_cali, usr_fernando);


    -- =====================================================
    -- 4. CATEGORIAS
    -- =====================================================

    INSERT INTO categoria (nombre_categoria, descripcion_categoria)
    VALUES ('Sociales', 'Bodas y celebraciones familiares')
    RETURNING id_categoria INTO cat_sociales;

    INSERT INTO categoria (nombre_categoria, descripcion_categoria)
    VALUES ('Corporativos', 'Conferencias y lanzamientos')
    RETURNING id_categoria INTO cat_corporativos;

    INSERT INTO categoria (nombre_categoria, descripcion_categoria)
    VALUES ('Conciertos y Festivales', 'Eventos musicales')
    RETURNING id_categoria INTO cat_conciertos;

    INSERT INTO categoria (nombre_categoria, descripcion_categoria)
    VALUES ('Cumpleaños y Quinceaños', 'Celebraciones tematicas')
    RETURNING id_categoria INTO cat_quince;


    -- =====================================================
    -- 5. DISPONIBILIDADES
    -- =====================================================

    INSERT INTO disponibilidad (fecha_hora, estado)
    VALUES ('2026-12-05 14:00:00', 'Disponible')
    RETURNING id_disponibilidad INTO disp1;

    INSERT INTO disponibilidad (fecha_hora, estado)
    VALUES ('2026-12-10 09:00:00', 'Disponible')
    RETURNING id_disponibilidad INTO disp2;

    INSERT INTO disponibilidad (fecha_hora, estado)
    VALUES ('2026-12-15 18:00:00', 'Disponible')
    RETURNING id_disponibilidad INTO disp3;

    INSERT INTO disponibilidad (fecha_hora, estado)
    VALUES ('2026-12-20 16:00:00', 'Disponible')
    RETURNING id_disponibilidad INTO disp4;

    INSERT INTO disponibilidad (fecha_hora, estado)
    VALUES ('2027-01-10 12:00:00', 'Disponible')
    RETURNING id_disponibilidad INTO disp5;

    INSERT INTO disponibilidad (fecha_hora, estado)
    VALUES ('2027-01-15 12:00:00', 'Disponible')
    RETURNING id_disponibilidad INTO disp6;


    -- =====================================================
    -- 6. SERVICIOS
    -- =====================================================

    INSERT INTO servicio
    (nombre_servicio, descripcion_servicio, precio_referencia,
     id_empresa, id_disponibilidad)
    VALUES
    ('Catering Premium', 'Banquete para 100 personas',
     2500000, '900123456-1', disp1)
    RETURNING id_servicio INTO serv_catering;

    INSERT INTO servicio
    (nombre_servicio, descripcion_servicio, precio_referencia,
     id_empresa, id_disponibilidad)
    VALUES
    ('Sonido e Iluminacion', 'Montaje con DJ y luces LED',
     1200000, '900123456-1', disp2)
    RETURNING id_servicio INTO serv_sonido;

    INSERT INTO servicio
    (nombre_servicio, descripcion_servicio, precio_referencia,
     id_empresa, id_disponibilidad)
    VALUES
    ('Pantallas LED Gigantes', 'Pantallas de alta resolucion',
     1800000, '900888777-2', disp3)
    RETURNING id_servicio INTO serv_pantallas;

    INSERT INTO servicio
    (nombre_servicio, descripcion_servicio, precio_referencia,
     id_empresa, id_disponibilidad)
    VALUES
    ('Decoracion Tematica', 'Decoracion con luces y elementos decorativos',
     850000, '900888777-2', disp4)
    RETURNING id_servicio INTO serv_decoracion;

    INSERT INTO servicio
    (nombre_servicio, descripcion_servicio, precio_referencia,
     id_empresa, id_disponibilidad)
    VALUES
    ('Estacion de Bebidas sin Alcohol', 'Bebidas y refrescos para eventos',
     750000, '900555444-3', disp5)
    RETURNING id_servicio INTO serv_bebidas;

    INSERT INTO servicio
    (nombre_servicio, descripcion_servicio, precio_referencia,
     id_empresa, id_disponibilidad)
    VALUES
    ('Buffet Internacional', 'Comida para 150 personas',
     3200000, '900555444-3', disp6)
    RETURNING id_servicio INTO serv_buffet;


    -- =====================================================
    -- 7. ACTUALIZAR DISPONIBILIDADES
    -- =====================================================

    UPDATE disponibilidad SET id_servicio = serv_catering
    WHERE id_disponibilidad = disp1;

    UPDATE disponibilidad SET id_servicio = serv_sonido
    WHERE id_disponibilidad = disp2;

    UPDATE disponibilidad SET id_servicio = serv_pantallas
    WHERE id_disponibilidad = disp3;

    UPDATE disponibilidad SET id_servicio = serv_decoracion
    WHERE id_disponibilidad = disp4;

    UPDATE disponibilidad SET id_servicio = serv_bebidas
    WHERE id_disponibilidad = disp5;

    UPDATE disponibilidad SET id_servicio = serv_buffet
    WHERE id_disponibilidad = disp6;


    -- =====================================================
    -- 8. EVENTOS
    -- =====================================================

    INSERT INTO evento
    (nombre_evento, descripcion_evento, id_empresa, id_categoria)
    VALUES
    ('Lanzamiento Marca Tech 2026',
     'Conferencia corporativa de innovacion',
     '900888777-2', cat_corporativos)
    RETURNING id_evento INTO ev_lanzamiento;

    INSERT INTO evento
    (nombre_evento, descripcion_evento, id_empresa, id_categoria)
    VALUES
    ('XV Anos Tematicos',
     'Celebracion con decoracion especial',
     '900888777-2', cat_quince)
    RETURNING id_evento INTO ev_quince;

    INSERT INTO evento
    (nombre_evento, descripcion_evento, id_empresa, id_categoria)
    VALUES
    ('Boda Campestre Cali',
     'Recepcion al aire libre con comida',
     '900555444-3', cat_sociales)
    RETURNING id_evento INTO ev_boda;


    -- =====================================================
    -- 9. MUESTRAS
    -- =====================================================

    INSERT INTO muestra (descripcion_muestra, url, id_servicio)
    VALUES
    ('Fotografia de catering',
     'https://ejemplo.com/muestras/catering.jpg',
     serv_catering);

    INSERT INTO muestra (descripcion_muestra, url, id_servicio)
    VALUES
    ('Fotografia de pantallas LED',
     'https://ejemplo.com/muestras/pantallas.jpg',
     serv_pantallas);

    INSERT INTO muestra (descripcion_muestra, url, id_servicio)
    VALUES
    ('Fotografia de decoracion',
     'https://ejemplo.com/muestras/decoracion.jpg',
     serv_decoracion);

    INSERT INTO muestra (descripcion_muestra, url, id_servicio)
    VALUES
    ('Fotografia de buffet',
     'https://ejemplo.com/muestras/buffet.jpg',
     serv_buffet);


    -- =====================================================
    -- 10. RELACION SERVICIO - EVENTO
    -- =====================================================

    INSERT INTO servicio_evento (id_servicio, id_evento)
    VALUES (serv_pantallas, ev_lanzamiento);

    INSERT INTO servicio_evento (id_servicio, id_evento)
    VALUES (serv_sonido, ev_lanzamiento);

    INSERT INTO servicio_evento (id_servicio, id_evento)
    VALUES (serv_decoracion, ev_quince);

    INSERT INTO servicio_evento (id_servicio, id_evento)
    VALUES (serv_buffet, ev_boda);


    -- =====================================================
    -- 11. RESERVAS
    -- =====================================================

    INSERT INTO reserva
    (fecha_hora, estado, precio_total, tipo_evento,
     cantidad_personas, mensaje, id_usuario, id_servicio)
    VALUES
    ('2026-10-05 14:00:00', 'ACEPTADA', 250000.00,
     'Matrimonio', 80, 'Solicito opciones vegetarianas.',
     usr_carlos, serv_buffet)
    RETURNING id_reserva INTO res_carlos;

    INSERT INTO reserva
    (fecha_hora, estado, precio_total, tipo_evento,
     cantidad_personas, mensaje, id_usuario, id_servicio)
    VALUES
    ('2026-10-15 18:00:00', 'ACEPTADA', 500000.00,
     'Evento empresarial', 120, 'Instalacion antes de las 5 p. m.',
     usr_laura, serv_pantallas)
    RETURNING id_reserva INTO res_laura;

    INSERT INTO reserva
    (fecha_hora, estado, precio_total, tipo_evento,
     cantidad_personas, mensaje, id_usuario, id_servicio)
    VALUES
    ('2026-12-20 16:00:00', 'PENDIENTE', 350000.00,
     'Quinceañero', 60, 'Preferimos tonos lavanda y blanco.',
     usr_sofia, serv_decoracion)
    RETURNING id_reserva INTO res_sofia;


    -- =====================================================
    -- 12. DETALLE DE SERVICIOS EN RESERVAS
    -- =====================================================

    INSERT INTO servicio_reserva (id_reserva, id_evento, id_servicio)
    VALUES (res_carlos, ev_boda, serv_buffet);

    INSERT INTO servicio_reserva (id_reserva, id_evento, id_servicio)
    VALUES (res_laura, ev_lanzamiento, serv_pantallas);

    INSERT INTO servicio_reserva (id_reserva, id_evento, id_servicio)
    VALUES (res_sofia, ev_quince, serv_decoracion);


    -- =====================================================
    -- 13. RESENAS
    -- =====================================================

    INSERT INTO resena
    (fecha_resena, descripcion_resena, calificacion,
     respuesta_empresa, id_reserva)
    VALUES
    ('2026-10-06', 'Excelente servicio y atencion.', 5,
     'Gracias por confiar en nosotros. Nos alegra que hayan disfrutado el servicio.',
     res_carlos);

    INSERT INTO resena
    (fecha_resena, descripcion_resena, calificacion, id_reserva)
    VALUES
    ('2026-10-16', 'Muy buena calidad del montaje.', 4,
     res_laura);

END $$;

COMMIT;