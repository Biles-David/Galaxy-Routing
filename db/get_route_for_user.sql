SELECT *
FROM locations l
JOIN routes r
ON l.store_id = r.location_id
WHERE r.user_id = $1
ORDER BY r.route_order ASC;