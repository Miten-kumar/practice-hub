import { OrdersService } from "../services/orders.service.js";

export class OrdersController {
  private ordersService: OrdersService;

  constructor() {
    this.ordersService = new OrdersService();
  }

  async createOrder(req: any, res: any) {
    try {
      const { user_id, product_id, quantity } = req.body;
      const order = await this.ordersService.createOrder(
        user_id,
        product_id,
        quantity,
      );
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  }

  async getOrderById(req: any, res: any) {
    try {
      const { order_id } = req.params;
      const order = await this.ordersService.getOrderById(order_id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve order" });
    }
  }

  async updateOrder(req: any, res: any) {
    try {
      const { order_id } = req.params;
      const { user_id, product_id, quantity } = req.body;
      const updatedOrder = await this.ordersService.updateOrder(
        order_id,
        user_id,
        product_id,
        quantity,
      );
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  }

  async deleteOrder(req: any, res: any) {
    try {
      const { order_id } = req.params;
      await this.ordersService.deleteOrder(order_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete order" });
    }
  }
}
