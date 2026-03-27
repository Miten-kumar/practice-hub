import { randomUUID } from "node:crypto";
import { AppDataSource } from "../data-source.js";
import { OrderRepository } from "../repositories/orders.repository.js";
import { PaymentRepository } from "../repositories/payments.repository.js";
import { ProductRepository } from "../repositories/products.repository.js";
import type { IOrder } from "../types/order.js";

export class OrderService {
  orderRepository = new OrderRepository();
  productRepository = new ProductRepository();
  paymentRepository = new PaymentRepository();

  async createOrder(orderDetails: IOrder) {
    const userId = orderDetails.user_id;
    const productId = orderDetails.prod_id;
    const quantity = orderDetails.quantity;

    if (!userId || !productId || !quantity) {
      throw new Error("user_id, prod_id, and quantity are required.");
    }

    if (quantity <= 0) {
      throw new Error("quantity must be greater than zero.");
    }

    const result = await AppDataSource.transaction(async (manager) => {
      const product = await this.productRepository.getProductById(
        productId,
        manager,
      );

      if (!product) {
        throw new Error("Product not found.");
      }

      if (product.stock < quantity) {
        throw new Error("Insufficient stock.");
      }

      const updateResult = await this.productRepository.reserveStock(
        productId,
        quantity,
        product.version,
        manager,
      );

      if (!updateResult.affected) {
        return null;
      }

      const savedOrder = await this.orderRepository.createOrder(
        {
          user_id: userId,
          prod_id: productId,
          quantity,
          status: "completed",
        },
        manager,
      );

      const savedPayment = await this.paymentRepository.createPayment(
        {
          order_id: savedOrder.order_id,
          status: "completed",
          amount: Number(product.price) * quantity,
          transaction_id: randomUUID(),
        },
        manager,
      );

      return {
        order: savedOrder,
        payment: savedPayment,
        reservedStock: quantity,
        remainingStock: product.stock - quantity,
      };
    });

    if (result) {
      return result;
    }

    throw new Error("Concurrent update detected. Please retry.");
  }
}
