-- Ejecutar una vez en bases creadas antes de guardar detalles de solicitudes.
ALTER TABLE reserva
    ADD COLUMN IF NOT EXISTS tipo_evento VARCHAR(100);

ALTER TABLE reserva
    ADD COLUMN IF NOT EXISTS cantidad_personas INTEGER;

ALTER TABLE reserva
    ADD COLUMN IF NOT EXISTS mensaje TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'ck_reserva_cantidad_personas_positive'
          AND conrelid = 'reserva'::regclass
    ) THEN
        ALTER TABLE reserva
            ADD CONSTRAINT ck_reserva_cantidad_personas_positive
            CHECK (cantidad_personas IS NULL OR cantidad_personas > 0);
    END IF;
END
$$;
