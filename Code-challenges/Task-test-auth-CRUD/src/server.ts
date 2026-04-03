import { AppDataSource } from "./data-source.js"
import "reflect-metadata";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("connection successful");

    app.listen(PORT, () => {
      console.log("server is running on : ", PORT);
    });
  })
  .catch((err: unknown) => {
    console.log(err);
  });

export default app
