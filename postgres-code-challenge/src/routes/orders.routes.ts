import { OrdersController } from "../controllers/orders.controller.js";
import express from "express";

const router = express.Router();
const ordersController = new OrdersController();

router.post("/", (req, res) => ordersController.createOrder(req, res));
router.get("/:order_id", (req, res) => ordersController.getOrderById(req, res));
router.put("/:order_id", (req, res) => ordersController.updateOrder(req, res));
router.delete("/:order_id", (req, res) =>
  ordersController.deleteOrder(req, res),
);

export default router;
