import pool from "./db";

async function queryRun() {
  try {

    //purchased items by users with amount
    const query1 = await pool.query(`
            SELECT 
                u.name AS buyer_name, 
                p.title AS product_purchased, 
                o.amount, 
                o.order_date
            FROM orders o
            JOIN users u ON o.users_id = u.users_id
            JOIN product p ON o.product_id = p.product_id;`);

    //Total spent by user
    const query2 = await pool.query(`
            SELECT 
                u.name AS buyer_name, 
                SUM(o.amount) AS total_spent
                FROM orders o
            JOIN users u ON o.users_id = u.users_id
            GROUP BY u.users_id, u.name
            ORDER BY total_spent DESC
        `);

    //product which is most expensive
    const query3 = await pool.query(`
            SELECT 
                title, 
                price 
            FROM product 
            WHERE price = (SELECT MAX(price) FROM product);
        `);

    //purcahse amount greater than overall average value
    const query4 = await pool.query(`
            SELECT 
                u.name, 
                p.title, 
                o.amount
            FROM orders o
            JOIN users u ON o.users_id = u.users_id
            JOIN product p ON o.product_id = p.product_id
            WHERE o.amount > (SELECT AVG(amount) FROM orders);
        `);

    //users who purchase product above 500$  
    const query5 = await pool.query(`
            SELECT 
                name, 
                email 
            FROM users 
            WHERE users_id IN (
            SELECT o.users_id 
            FROM orders o 
            JOIN product p ON o.product_id = p.product_id 
            WHERE p.price > 500);
        `);

    return { query1, query2, query3, query4, query5 };
  } catch (error) {
    console.error("query not executed");
  }
}

export default queryRun;
