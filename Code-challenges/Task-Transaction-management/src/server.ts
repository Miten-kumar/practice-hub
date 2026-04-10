import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import orderRouter from "./routes/order.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/orders", orderRouter);

const checkConnection = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    console.log("connection successful");
  } catch (error) {
    console.log(error);
  }
};

await checkConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});

export default app;
