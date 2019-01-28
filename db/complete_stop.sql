UPDATE routes 
SET reasons = CONCAT(reasons, ' ', '[Completed]')
WHERE route_id = $1 AND location_id = $2
RETURNING *;

