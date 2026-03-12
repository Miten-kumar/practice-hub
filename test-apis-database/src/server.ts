import { AppDataSource } from "./config/data-source";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running");
    });
  })
  .catch(console.error);
