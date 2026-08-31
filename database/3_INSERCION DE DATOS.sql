-- =========================================================
-- DML: INSERCIÓN DE USUARIOS Y ROLES
-- =========================================================
INSERT INTO usuario (nombre_usuario, apellido_usuario, correo_usuario, telefono_usuario, contrasena_usuario, rol) VALUES 
('Carlos', 'Ramírez', 'carlos.ramirez@email.com', '3001234567', 'pass123', 'Cliente'),
('Ana', 'Martínez', 'ana.martinez@email.com', '3109876543', 'pass456', 'Proveedor'),
('Laura', 'Gómez', 'laura.gomez@email.com', '3205554433', 'pass789', 'Cliente');

-- =========================================================
-- DML: INSERCIÓN DE EMPRESAS, CATEGORÍAS, SERVICIOS Y DISPONIBILIDAD
-- =========================================================
INSERT INTO departamento (nombre_departamento) VALUES ('Cundinamarca');
INSERT INTO ciudad (nombre_ciudad, id_departamento) VALUES ('Bogotá', 1);

INSERT INTO empresa (id_empresa, nombre_empresa, descripcion_empresa, contacto_empresa, direccion_empresa, id_ciudad, id_usuario) VALUES 
('900123456-1', 'Eventos Elite S.A.S.', 'Organización y logística integral de eventos', 'Ana Martínez', 'Calle 100 #15-20', 1, 2);

INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES 
('Sociales', 'Eventos sociales como bodas y cumpleaños'),
('Corporativos', 'Empresas, conferencias y lanzamientos');

INSERT INTO disponibilidad (fecha_hora, estado) VALUES 
('2026-10-15 14:00:00', 'Disponible'),
('2026-10-20 09:00:00', 'Disponible');

INSERT INTO servicio (nombre_servicio, descripcion_servicio, precio_referencia, id_empresa, id_disponibilidad) VALUES 
('Catering Premium', 'Banquete de 3 tiempos para 100 personas', 2500000.00, '900123456-1', 1),
('Sonido e Iluminación', 'Montaje con DJ y luces LED', 1200000.00, '900123456-1', 2);

UPDATE disponibilidad SET id_servicio = 1 WHERE id_disponibilidad = 1;
UPDATE disponibilidad SET id_servicio = 2 WHERE id_disponibilidad = 2;

-- =========================================================
-- DML: CREAR SOLICITUD DE RESERVA Y VINCULAR SERVICIOS
-- =========================================================
-- 1. Crear cabecera de la reserva
INSERT INTO reserva (fecha_hora, estado, id_usuario) VALUES 
('2026-10-15 14:00:00', 'PENDIENTE', 1);

-- 2. Crear evento asociado
INSERT INTO evento (nombre_evento, descripcion_evento, id_empresa, id_categoria) VALUES 
('Boda Carlos & Sofia', 'Recepción de matrimonio', '900123456-1', 1);

-- 3. Detalle de la reserva (dispara actualización de precio_total mediante Trigger)
INSERT INTO servicio_reserva (id_reserva, id_evento, id_servicio) VALUES 
(1, 1, 1),
(1, 1, 2);

-- =========================================================
-- DML: RESEÑAS / FEEDBACK DE RESERVAS COMPLETADAS
-- =========================================================
INSERT INTO resena (fecha_resena, descripcion_resena, id_reserva) VALUES 
('2026-10-16', 'Excelente atención, la comida y el sonido superaron las expectativas.', 1);

-- =========================================================
-- DATOS ADICIONALES SIN DEPENDENCIAS DE ID FIJOS
-- =========================================================

-- 1. Departamentos y Ciudades
INSERT INTO departamento (nombre_departamento) VALUES 
('Antioquia'),
('Valle del Cauca');

INSERT INTO ciudad (nombre_ciudad, id_departamento) VALUES 
('Medellín', (SELECT id_departamento FROM departamento WHERE nombre_departamento = 'Antioquia')),
('Envigado', (SELECT id_departamento FROM departamento WHERE nombre_departamento = 'Antioquia')),
('Cali', (SELECT id_departamento FROM departamento WHERE nombre_departamento = 'Valle del Cauca'));

-- 2. Usuarios
INSERT INTO usuario (nombre_usuario, apellido_usuario, correo_usuario, telefono_usuario, contrasena_usuario, rol) VALUES 
('David', 'Sánchez', 'david.sanchez@email.com', '3151112233', 'pass111', 'Cliente'),
('Elena', 'Torres', 'elena.torres@email.com', '3184445566', 'pass222', 'Proveedor'),
('Fernando', 'Ruiz', 'fernando.ruiz@email.com', '3017778899', 'pass333', 'Proveedor'),
('Sofia', 'Castro', 'sofia.castro@email.com', '3129990011', 'pass444', 'Cliente');

-- 3. Empresas
INSERT INTO empresa (id_empresa, nombre_empresa, descripcion_empresa, contacto_empresa, direccion_empresa, id_ciudad, id_usuario) VALUES 
('900888777-2', 'Antioquia Sound & Lights', 'Especialistas en producción técnica audiovisual', 'Elena Torres', 'Carrera 43A #10-12', 
  (SELECT id_ciudad FROM ciudad WHERE nombre_ciudad = 'Medellín'), 
  (SELECT id_usuario FROM usuario WHERE correo_usuario = 'elena.torres@email.com')),
  
('900555444-3', 'Catering & Gourmet Valluno', 'Alta cocina y pasabocas para eventos corporativos y bodas', 'Fernando Ruiz', 'Avenida 6N #22-45', 
  (SELECT id_ciudad FROM ciudad WHERE nombre_ciudad = 'Cali'), 
  (SELECT id_usuario FROM usuario WHERE correo_usuario = 'fernando.ruiz@email.com'));

-- 4. Categorías
INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES 
('Conciertos y Festivales', 'Montajes de gran escala y producción musical'),
('Cumpleaños y Quinceaños', 'Fiestas temáticas y celebraciones familiares');

-- 5. Eventos
INSERT INTO evento (nombre_evento, descripcion_evento, id_empresa, id_categoria) VALUES 
('Lanzamiento Marca Tech 2026', 'Conferencia corporativa de innovación', '900888777-2', 
  (SELECT id_categoria FROM categoria WHERE nombre_categoria = 'Conciertos y Festivales')),
('XV Años Temáticos', 'Celebración estilo neón en Medellín', '900888777-2', 
  (SELECT id_categoria FROM categoria WHERE nombre_categoria = 'Cumpleaños y Quinceaños')),
('Boda Campestre Cali', 'Recepción al aire libre con cena de 4 tiempos', '900555444-3', 
  (SELECT id_categoria FROM categoria WHERE nombre_categoria = 'Conciertos y Festivales'));

-- 6. Disponibilidades y Servicios
INSERT INTO disponibilidad (fecha_hora, estado) VALUES ('2026-09-05 18:00:00', 'Disponible');
INSERT INTO servicio (nombre_servicio, descripcion_servicio, precio_referencia, id_empresa, id_disponibilidad) 
VALUES ('Pantallas LED Gigantes', 'Montaje de pantallas de alta resolución P3', 1800000.00, '900888777-2', (SELECT MAX(id_disponibilidad) FROM disponibilidad));
UPDATE disponibilidad SET id_servicio = (SELECT MAX(id_servicio) FROM servicio) WHERE id_disponibilidad = (SELECT MAX(id_disponibilidad) FROM disponibilidad);

INSERT INTO disponibilidad (fecha_hora, estado) VALUES ('2026-09-10 10:00:00', 'Disponible');
INSERT INTO servicio (nombre_servicio, descripcion_servicio, precio_referencia, id_empresa, id_disponibilidad) 
VALUES ('Efectos Especiales y Pirotecnia', 'Chispas frías, humo denso y confeti', 850000.00, '900888777-2', (SELECT MAX(id_disponibilidad) FROM disponibilidad));
UPDATE disponibilidad SET id_servicio = (SELECT MAX(id_servicio) FROM servicio) WHERE id_disponibilidad = (SELECT MAX(id_disponibilidad) FROM disponibilidad);

INSERT INTO disponibilidad (fecha_hora, estado) VALUES ('2026-11-01 20:00:00', 'Disponible');
INSERT INTO servicio (nombre_servicio, descripcion_servicio, precio_referencia, id_empresa, id_disponibilidad) 
VALUES ('Estación de Cócteles Gourmet', 'Barra libre de coctelería de autor por 5 horas', 1500000.00, '900555444-3', (SELECT MAX(id_disponibilidad) FROM disponibilidad));
UPDATE disponibilidad SET id_servicio = (SELECT MAX(id_servicio) FROM servicio) WHERE id_disponibilidad = (SELECT MAX(id_disponibilidad) FROM disponibilidad);

INSERT INTO disponibilidad (fecha_hora, estado) VALUES ('2026-11-15 12:00:00', 'Disponible');
INSERT INTO servicio (nombre_servicio, descripcion_servicio, precio_referencia, id_empresa, id_disponibilidad) 
VALUES ('Buffet Internacional', 'Variedad de carnes, ensaladas y postres para 150 pax', 3200000.00, '900555444-3', (SELECT MAX(id_disponibilidad) FROM disponibilidad));
UPDATE disponibilidad SET id_servicio = (SELECT MAX(id_servicio) FROM servicio) WHERE id_disponibilidad = (SELECT MAX(id_disponibilidad) FROM disponibilidad);

-- 7. Muestras
INSERT INTO muestra (descripcion_muestra, url, id_servicio) VALUES 
('Foto pantalla LED en concierto', 'https://antioquiasound.com/muestras/led_pantalla.jpg', (SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Pantallas LED Gigantes')),
('Video de chispas frías en baile de 15s', 'https://antioquiasound.com/muestras/efectos_quince.mp4', (SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Efectos Especiales y Pirotecnia')),
('Menú de cócteles destacados', 'https://gourmetvalluno.com/muestras/cocteles.jpg', (SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Estación de Cócteles Gourmet')),
('Presentación buffet elegante', 'https://gourmetvalluno.com/muestras/buffet_boda.jpg', (SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Buffet Internacional'));

-- 8. Relación Servicio - Evento
INSERT INTO servicio_evento (id_servicio, id_evento) VALUES 
((SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Pantallas LED Gigantes'), (SELECT id_evento FROM evento WHERE nombre_evento = 'Lanzamiento Marca Tech 2026')),
((SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Efectos Especiales y Pirotecnia'), (SELECT id_evento FROM evento WHERE nombre_evento = 'XV Años Temáticos')),
((SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Estación de Cócteles Gourmet'), (SELECT id_evento FROM evento WHERE nombre_evento = 'Boda Campestre Cali')),
((SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Buffet Internacional'), (SELECT id_evento FROM evento WHERE nombre_evento = 'Boda Campestre Cali'));

-- 9. Reservas
INSERT INTO reserva (fecha_hora, estado, id_usuario) VALUES 
('2026-09-05 18:00:00', 'ACEPTADA', (SELECT id_usuario FROM usuario WHERE correo_usuario = 'david.sanchez@email.com')),
('2026-09-10 10:00:00', 'CONFIRMADA', (SELECT id_usuario FROM usuario WHERE correo_usuario = 'sofia.castro@email.com')),
('2026-11-01 20:00:00', 'CONFIRMADA', (SELECT id_usuario FROM usuario WHERE correo_usuario = 'david.sanchez@email.com'));

-- 10. Detalle de Servicios en Reservas
INSERT INTO servicio_reserva (id_reserva, id_evento, id_servicio) VALUES 
((SELECT MAX(id_reserva) - 2 FROM reserva), (SELECT id_evento FROM evento WHERE nombre_evento = 'Lanzamiento Marca Tech 2026'), (SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Pantallas LED Gigantes')),
((SELECT MAX(id_reserva) - 1 FROM reserva), (SELECT id_evento FROM evento WHERE nombre_evento = 'XV Años Temáticos'), (SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Efectos Especiales y Pirotecnia')),
((SELECT MAX(id_reserva) FROM reserva), (SELECT id_evento FROM evento WHERE nombre_evento = 'Boda Campestre Cali'), (SELECT id_servicio FROM servicio WHERE nombre_servicio = 'Estación de Cócteles Gourmet'));

-- 11. Reseñas
INSERT INTO resena (fecha_resena, descripcion_resena, id_reserva) VALUES 
('2026-09-06', 'Las pantallas LED le dieron una calidad tremenda al lanzamiento. Súper recomendados.', (SELECT MAX(id_reserva) - 2 FROM reserva)),
('2026-11-02', 'La barra de cócteles y la comida fueron un éxito total en la boda.', (SELECT MAX(id_reserva) FROM reserva));