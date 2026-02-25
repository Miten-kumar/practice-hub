import  express  from "express"
import dotenv from "dotenv"
import { AppDataSource } from "./data-source"
import "reflect-metadata";
import userRoutes from "./routes/user.routes"

const app = express()
app.use(express.json());
dotenv.config()

app.use("/users",userRoutes)

const checkConnection = async () => {
    try{
        await AppDataSource.initialize()
        console.log("connection sucessfull")
    }
    catch(error){
        console.log(error)
    }
}

await checkConnection();

const PORT = process.env.port || 3000;

app.listen(PORT,() =>{
    console.log("server is running on",PORT)
})