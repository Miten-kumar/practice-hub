import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { OrderService } from "../services/createOrder";

const orderService = new OrderService(AppDataSource);

class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { userId, items } = req.body;

      const result = await orderService.createOrder({ userId, items });

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: result,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create order";

      return res.status(400).json({
        success: false,
        message,
      });
    }
  }
}

export const orderController = new OrderController();
