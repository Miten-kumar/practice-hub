import express from "express";
import { productController } from "./controllers/products";
import cors from "cors";

const app = express();

app.use(cors()); // allow all origins (not safe for production)

app.get("/products", productController);

export default app;
