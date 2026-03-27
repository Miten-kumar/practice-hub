import "reflect-metadata";
import { app } from "./app.js";
import { AppDataSource } from "./data-source.js";
import { Users } from "./entity/Users.js";

AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));
