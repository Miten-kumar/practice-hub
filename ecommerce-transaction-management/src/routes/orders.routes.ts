import { Router } from "express";
import { createOrderController } from "../controllers/orders.controller.js";

export const orderRoutes = Router();

orderRoutes.post("/", createOrderController);
