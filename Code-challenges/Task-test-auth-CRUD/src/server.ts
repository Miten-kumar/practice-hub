import { AppDataSource } from "./data-source"
import "reflect-metadata";
import app from "./app";

const PORT = process.env.port || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("connection successful");

    app.listen(PORT, () => {
      console.log("server is running on", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export default app