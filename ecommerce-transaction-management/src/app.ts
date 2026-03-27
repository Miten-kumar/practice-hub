import express from "express";
import { orderRoutes } from "./routes/orders.routes.js";
export const app = express();

app.use(express.json());
app.use("/orders", orderRoutes);
