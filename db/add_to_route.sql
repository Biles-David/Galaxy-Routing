INSERT INTO routes (route_id, route_name, location_id, user_id, reasons, route_order)
VALUES( $1, $2, $3, $4, $5, $6);
SELECT r.*, l.lat, l.lng
FROM routes r
JOIN locations l
ON r.location_id = l.store_id
WHERE route_id = $1
ORDER BY r.route_order ASC;