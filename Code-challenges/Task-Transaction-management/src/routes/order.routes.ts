import { Router } from "express";
import { orderController } from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/create-order", (req, res) =>
  orderController.createOrder(req, res),
);

export default orderRouter;
