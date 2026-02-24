/* @name FindUserById */
SELECT * FROM users WHERE users_id = :userId;

/* @name FindExpensiveProduct */
SELECT 
title, 
price 
FROM product 
WHERE price = (SELECT MAX(price) FROM product);
