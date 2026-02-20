import express from 'express';
import pool from './db'
import dotenv from 'dotenv'
import queryRun from './query';

const app = express()
app.use(express.json())

dotenv.config()

const queryResult = await queryRun()
console.log(queryResult?.query1.rows)
console.log(queryResult?.query2.rows)
console.log(queryResult?.query3.rows)
console.log(queryResult?.query4.rows)
console.log(queryResult?.query5.rows )

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