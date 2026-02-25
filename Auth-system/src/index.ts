import Express from "express";
import { AppDataSource } from "./data-source";
import { authRouter } from "./routers/auth.routes";

const app = Express();

AppDataSource.initialize();

app.use(Express.json());

app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
