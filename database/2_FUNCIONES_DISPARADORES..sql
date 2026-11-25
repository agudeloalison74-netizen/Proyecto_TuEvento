SELECT
    table_name,
    (xpath('/row/count/text()', 
        query_to_xml(
            format('SELECT COUNT(*) AS count FROM public.%I', table_name),
            false, true, ''
        )
    ))[1]::text::integer AS cantidad_registros
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;