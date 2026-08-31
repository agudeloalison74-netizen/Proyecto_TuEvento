-- =========================================================
-- FUNCIONES Y DISPARADORES (TRIGGERS) - TUEVENTO
-- =========================================================

-- Trigger 1: Calcular automáticamente el precio total de una reserva
CREATE OR REPLACE FUNCTION fn_calcular_precio_total_reserva()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE reserva
    SET precio_total = (
        SELECT COALESCE(SUM(s.precio_referencia), 0)
        FROM servicio_reserva sr
        JOIN servicio s ON sr.id_servicio = s.id_servicio
        WHERE sr.id_reserva = COALESCE(NEW.id_reserva, OLD.id_reserva)
    )
    WHERE id_reserva = COALESCE(NEW.id_reserva, OLD.id_reserva);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_precio_reserva
AFTER INSERT OR UPDATE OR DELETE ON servicio_reserva
FOR EACH ROW
EXECUTE FUNCTION fn_calcular_precio_total_reserva();


-- Trigger 2: Marcar disponibilidad como 'Reservado' al asignar un servicio
CREATE OR REPLACE FUNCTION fn_actualizar_estado_disponibilidad()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE disponibilidad
    SET estado = 'Reservado'
    WHERE id_servicio = NEW.id_servicio AND estado = 'Disponible';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_marcar_reservado
AFTER INSERT ON servicio_reserva
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_estado_disponibilidad();