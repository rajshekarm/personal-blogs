SELECT source, external_id, title, is_active, updated_at
FROM deals
ORDER BY updated_at DESC
LIMIT 20;
