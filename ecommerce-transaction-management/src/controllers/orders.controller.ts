import type { Request, Response } from "express";
import { OrderService } from "../services/orders.service.js";

export const createOrderController = async (req: Request, res: Response) => {
  const orderService = new OrderService();
  try {
    const { prod_id, user_id, quantity } = req.body;
    const result = await orderService.createOrder({
      prod_id,
      user_id,
      quantity,
    });

    return res.status(201).json({
      message: "order created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "order failed" });
  }
};
