import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started");
    });
  })
  .catch(console.error);