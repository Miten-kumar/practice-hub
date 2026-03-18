import "reflect-metadata";
import app from "./index";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv"

dotenv.config()
AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port : ${process.env.PORT}`);
    });
  })
  .catch(console.error);