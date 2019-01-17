SELECT r.*, l.lat, l.lng
FROM routes r
JOIN locations l
ON r.location_id = l.store_id
WHERE route_id = $1
ORDER BY r.route_order ASC;