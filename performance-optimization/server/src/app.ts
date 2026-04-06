import express from "express";
import { productController } from "./controllers/products";
import cors from "cors";
import { createRumMetric, getRumMetrics } from "./controllers/rum";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/products", productController);
app.post("/rum", createRumMetric);
app.get("/rum", getRumMetrics);

export default app;
