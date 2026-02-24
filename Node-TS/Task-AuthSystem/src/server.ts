import express from 'express';
import {pool} from './Db/db';

const app = express();
app.use(express.json());

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
 
const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
})