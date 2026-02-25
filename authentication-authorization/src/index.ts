import "reflect-metadata";
import express from "express";
import userRoutes from "./routes/user.routes";
import { AppDataSource } from "./db/datasource";
import dotenv from "dotenv";

dotenv.config();

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("DB error", err);
  });

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});