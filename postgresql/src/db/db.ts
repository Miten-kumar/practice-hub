import {Client, Pool} from "pg"
import dotenv from "dotenv"

dotenv.config()

export const client = new Client({
    connectionString: process.env.DATABASE_URL
})


export const query = async (text:string, params?: any[]) => {
  const start = Date.now()
  const res = await client.query(text, params)
  const duration = Date.now() - start
  console.log('executed query', { duration, rows: res.rowCount })
  return res
}