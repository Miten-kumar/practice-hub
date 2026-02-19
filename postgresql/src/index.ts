import express from "express"


import {client, query} from "./db/db.js"
 
const app = express();

await client.connect()
console.log("Connected to the database successfully!");

const res = await query('SELECT * from users')
console.log("Query result:", res.rows.length)
const res2 = await query('SELECT * from products')
console.log("Query result:", res2.rows.length)

const res3 = await query('SELECT * from orders')
console.log("Query result:", res3.rows.length)

const res4 = await query('SELECT * from reviews')
console.log("Query result:", res4.rows.length)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})