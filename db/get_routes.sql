SELECT COUNT(route_id), route_id, u.name, u.employee_number, u.img
FROM routes r
JOIN users u
ON r.user_id = u.id
GROUP BY route_id, u.id
ORDER BY route_id ASC;