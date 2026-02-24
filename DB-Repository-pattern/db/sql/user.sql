/* @name createUser */
INSERT INTO users (name, email, mobile_no, password) VALUES (:name, :email, :mobile_no, :password) RETURNING *;


/* @name updateUser */
UPDATE users SET name = :name, email = :email, mobile_no = :mobile_no, password = :password WHERE id = :id RETURNING *;