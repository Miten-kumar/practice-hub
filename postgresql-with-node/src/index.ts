import express, { Request, Response } from "express";
import pool from "./db/db";

const app = express();
const PORT = 3000;

//get the products ordered by the user
app.get("/orders/:userid", async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userid as string);
  try {
    const result = await pool.query(
      `SELECT p.prod_id, p.prod_name, o.order_date, o.price 
       FROM products p
       JOIN orders o
       ON o.product_id = p.prod_id
       WHERE o.user_id = ${userId}`,
    );
    res.json({ orders: result.rows });
  } catch (error) {
    console.error("error while executing a quiry", error);
    res.status(500).json(error);
  }
});

// Find top 2 most purchased products (by total quantity sold)
app.get("/top-products", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT p.prod_id ,p.prod_name , o.total_quantity FROM products p
      JOIN (
      SELECT product_id, sum(quantity) as total_quantity FROM orders
      GROUP BY product_id ORDER BY total_quantity DESC LIMIT 2
      ) o
      ON p.prod_id = o.product_id
    `);
    res.json({ topProducts: result.rows });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Find users who have placed orders worth more than the average order value
app.get("/top-user", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT u.id , u.name, u.email, u.mobile_no, o.total_orders_value 
      FROM users u 
      JOIN (
        SELECT user_id , sum(price) as total_orders_value
        FROM orders
        GROUP BY user_id
        HAVING sum(price) >= (SELECT avg(price) FROM orders)
        ) o
      ON u.id = o.user_id;
     `);

    res.status(200).json({ topUser: result.rows });
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).json({ error: "internal server error" });
  }
});

// Find users who ordered a product but never reviewed it
app.get("/user-not-review", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT u.id, u.name, u.email, u.mobile_no
      FROM users u
      JOIN orders o ON u.id = o.user_id
      LEFT JOIN reviews r ON o.product_id = r.product_id AND u.id = r.user_id
      WHERE r.review_id IS NULL;
     `);
    res.status(200).json({ users: result.rows });
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).json({ error: "internal server error" });
  }
});

// Find the most expensive product ordered by each user
app.get("/most-expensive-product", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.name, u.email, u.mobile_no, p.prod_id, p.prod_name, o.price
      FROM users u
      JOIN orders o ON u.id = o.user_id
      JOIN products p ON o.product_id = p.prod_id
      WHERE o.price = (
        SELECT MAX(price) 
        FROM orders 
        WHERE user_id = u.id
      );
     `);
    res.status(200).json({ users: result.rows });
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
