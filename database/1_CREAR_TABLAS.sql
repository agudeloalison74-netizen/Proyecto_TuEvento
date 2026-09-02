-- =========================================================
-- ESTRUCTURA DDL: CREACIÓN DE TABLAS - TUEVENTO
-- =========================================================

-- 1. Departamento
CREATE TABLE departamento (
    id_departamento SERIAL PRIMARY KEY,
    nombre_departamento VARCHAR(100) NOT NULL
);

-- 2. Ciudad
CREATE TABLE ciudad (
    id_ciudad SERIAL PRIMARY KEY,
    nombre_ciudad VARCHAR(50) NOT NULL,
    id_departamento INT NOT NULL REFERENCES departamento(id_departamento) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Usuario
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    apellido_usuario VARCHAR(50) NOT NULL,
    correo_usuario VARCHAR(50) UNIQUE NOT NULL,
    telefono_usuario VARCHAR(10),
    contrasena_usuario VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

-- 4. Empresa
CREATE TABLE empresa (
    id_empresa VARCHAR(20) PRIMARY KEY, -- NIT
    nombre_empresa VARCHAR(150) NOT NULL,
    descripcion_empresa TEXT,
    contacto_empresa VARCHAR(100),
    direccion_empresa VARCHAR(200),
    id_ciudad INT NOT NULL REFERENCES ciudad(id_ciudad) ON DELETE RESTRICT ON UPDATE CASCADE,
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. Categoria
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    descripcion_categoria TEXT
);

-- 6. Evento
CREATE TABLE evento (
    id_evento SERIAL PRIMARY KEY,
    nombre_evento VARCHAR(100) NOT NULL,
    descripcion_evento TEXT,
    id_empresa VARCHAR(20) NOT NULL REFERENCES empresa(id_empresa) ON DELETE CASCADE ON UPDATE CASCADE,
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 7. Disponibilidad
CREATE TABLE disponibilidad (
    id_disponibilidad SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(100) NOT NULL,
    id_servicio INT
);

-- 8. Servicio
CREATE TABLE servicio (
    id_servicio SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(150) NOT NULL,
    descripcion_servicio TEXT,
    precio_referencia DECIMAL(12,2),
    id_empresa VARCHAR(20) NOT NULL REFERENCES empresa(id_empresa) ON DELETE CASCADE ON UPDATE CASCADE,
    id_disponibilidad INT REFERENCES disponibilidad(id_disponibilidad) ON DELETE SET NULL ON UPDATE CASCADE
);

-- FK de Disponibilidad a Servicio (Para cerrar dependencia circular)
ALTER TABLE disponibilidad 
    ADD CONSTRAINT fk_disponibilidad_servicio 
    FOREIGN KEY (id_servicio) REFERENCES servicio(id_servicio) 
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 9. Muestra
CREATE TABLE muestra (
    id_muestra SERIAL PRIMARY KEY,
    descripcion_muestra TEXT,
    url VARCHAR(500),
    id_servicio INT NOT NULL REFERENCES servicio(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 10. Servicio_Evento
CREATE TABLE servicio_evento (
    id_servicio INT NOT NULL REFERENCES servicio(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE,
    id_evento INT NOT NULL REFERENCES evento(id_evento) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_servicio, id_evento)
);

-- 11. Reserva
CREATE TABLE reserva (
    id_reserva SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
    precio_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    id_servicio INT NOT NULL REFERENCES servicio(id_servicio) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 12. Resena
CREATE TABLE resena (
    id_resena SERIAL PRIMARY KEY,
    fecha_resena DATE NOT NULL DEFAULT CURRENT_DATE,
    descripcion_resena TEXT,
    id_reserva INT NOT NULL REFERENCES reserva(id_reserva) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 13. Servicio_Reserva
CREATE TABLE servicio_reserva (
    id_reserva INT NOT NULL REFERENCES reserva(id_reserva) ON DELETE CASCADE ON UPDATE CASCADE,
    id_evento INT REFERENCES evento(id_evento) ON DELETE SET NULL ON UPDATE CASCADE,
    id_servicio INT NOT NULL REFERENCES servicio(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_reserva, id_servicio)
);