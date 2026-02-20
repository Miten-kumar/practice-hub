import express from "express";

import { client, query } from "./db/db.js";

const app = express();

await client.connect();
console.log("Connected to the database successfully!");

const res = await query(`
    select 
p.product_id, 
p.name as product_name,
o.unit_price,
sum(o.quantity) as total_quantity_sold,
sum(o.quantity*o.unit_price) as total_revenue
from orders as o
join products as p on p.product_id = o.product_id
group by p.product_id,o.unit_price
order by total_revenue desc
limit 10
    `);
console.log("Top 10 Revenue Generating Products", res.rows);


const res2 = await query(`
    SELECT 
    u.id AS user_id,
    u.name,
    SUM(o.quantity * o.unit_price) AS total_spent,
    COUNT(DISTINCT o.product_id) AS products_purchased
FROM users u
JOIN orders o 
    ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING SUM(o.quantity * o.unit_price) > (
    SELECT AVG(user_total)
    FROM (
        SELECT SUM(quantity * unit_price) AS user_total
        FROM orders
        GROUP BY user_id
    ) AS avg_table
)
ORDER BY total_spent DESC;
    `);
console.log("Users Who Spent More Than Average User Spending", res2.rows);

const res3 = await query(`
    SELECT 
    p.name AS product_name,
    AVG(r.rating) AS average_rating,
    COUNT(r.review_id) AS total_reviews
FROM products p
JOIN reviews r 
    ON p.product_id = r.product_id
GROUP BY p.product_id, p.name
HAVING AVG(r.rating) > (
    SELECT AVG(rating) 
    FROM reviews
)
ORDER BY average_rating DESC;
    `);
console.log("Products With Rating Above Overall Average Rating", res3.rows);

const res4 = await query(`
    SELECT 
    u.name AS user_name,
    p.name AS product_name,
    o.quantity,
    r.rating
FROM users u
JOIN orders o 
    ON u.id = o.user_id
JOIN reviews r 
    ON u.id = r.user_id 
    AND o.product_id = r.product_id
JOIN products p 
    ON p.product_id = o.product_id
WHERE r.rating = 5
  AND o.quantity > 1;
    `);
console.log("Users Who Gave 5-Star Reviews AND Purchased More Than 1 Quantity", res4.rows);

const res5 = await query(`
    SELECT 
    p.name AS product_name,
    p.price,
    AVG(r.rating) AS average_rating,
    COUNT(r.review_id) AS total_reviews
FROM (
    SELECT *
    FROM products
    ORDER BY price DESC
    LIMIT 10
) p
JOIN reviews r 
    ON p.product_id = r.product_id
GROUP BY p.product_id, p.name, p.price
ORDER BY average_rating DESC
LIMIT 1;
    `);
console.log("Highest Rated Product Among Top 10 Most Expensive Products", res5.rows);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
