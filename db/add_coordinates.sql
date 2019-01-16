UPDATE locations
SET lat = $1, lng = $2 
WHERE store_id = $3;