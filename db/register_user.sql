INSERT INTO users 
( name, employee_number, email, position, img, admin, hash )
VALUES ( $1, $2, $3, $4, $5, $6, $7)
RETURNING *;