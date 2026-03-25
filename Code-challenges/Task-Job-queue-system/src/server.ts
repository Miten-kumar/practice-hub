import dotenv from "dotenv";
import express from "express";
import usersRouter from "./routes/users.routes.js";
import {serverAdapter} from "./dashboard.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(usersRouter);
app.use("/queues", serverAdapter.getRouter());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
