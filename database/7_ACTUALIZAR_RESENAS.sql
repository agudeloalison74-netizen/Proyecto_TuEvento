-- Ejecutar una vez en bases creadas antes de agregar puntuaciones y respuestas.
ALTER TABLE resena
    ADD COLUMN IF NOT EXISTS calificacion SMALLINT;

ALTER TABLE resena
    ADD COLUMN IF NOT EXISTS respuesta_empresa TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'ck_resena_calificacion_range'
          AND conrelid = 'resena'::regclass
    ) THEN
        ALTER TABLE resena
            ADD CONSTRAINT ck_resena_calificacion_range
            CHECK (calificacion IS NULL OR calificacion BETWEEN 1 AND 5);
    END IF;
END
$$;
