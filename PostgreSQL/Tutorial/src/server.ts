import express from 'express';
import pool from './db'
import dotenv from 'dotenv'
import { findExpensiveProduct, findUserById } from './queries.queries';

const app = express()
app.use(express.json())

dotenv.config()

const users = await findUserById.run(
    {
      userId: 1,
    },
    pool
);
console.log("User name:",{users});

const expensiveProduct = await findExpensiveProduct.run(undefined ,pool);
console.log({expensiveProduct})

async function verifyConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}
 
verifyConnection();

app.listen(process.env.PORT,() => {
    console.log(`server is running on ${process.env.PORT}`)
})