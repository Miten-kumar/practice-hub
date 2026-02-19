import express, { Request, Response } from "express";
import pool from "./db/db";

const app = express();
const PORT = 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({ message: "Hello, World!", users: result.rows });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
