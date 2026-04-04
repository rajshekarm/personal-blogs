SELECT
  external_id,
  merchant,
  title,
  description,
  image_url,
  current_price,
  original_price,
  discount_percent,
  coupon_code,
  affiliate_url,
  ends_at
FROM deals
WHERE source = 'linkmydeals' AND is_active = TRUE
ORDER BY updated_at DESC
LIMIT 100;
