import express from 'express'
import itemRoutes from './routes/itemRoutes.js'
import env from './env.js';

const app = express();
app.use(express.json())

app.use("/items",itemRoutes)

app.listen(env.PORT,() => {
    console.log(`server is running on port ${env.PORT}`)
})

