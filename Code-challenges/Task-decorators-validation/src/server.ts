import express from "express";
import "reflect-metadata";
import { UserController } from "./controllers/user.controller";

const app = express();
app.use(express.json());

const controller = new UserController();

app.post("/user",controller.createUser.bind(controller));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});