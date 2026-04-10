import { DataSource } from "typeorm";
import { Users } from "../entities/user";
import { Product } from "../entities/product";
import { Orders } from "../entities/order";
import { OrderItem } from "../entities/orderItem";
import { Payment } from "../entities/payment";

type CreateOrderInput = {
  userId: number;
  items: { productId: number; qty: number }[];
};

export class OrderService {
  constructor(private dataSource: DataSource) {}

  async createOrder(data: CreateOrderInput) {
    if (!data.userId) {
      throw new Error("userId is required");
    }

    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new Error("At least one item is required");
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { items, userId } = data;
      const productPriceMap = new Map<number, number>();

      const user = await queryRunner.manager.findOne(Users, {
        where: { user_id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      let totalAmount = 0;

      for (const item of items) {
        if (!item.productId || !item.qty || item.qty <= 0) {
          throw new Error("Each item must include a valid productId and qty");
        }

        const product = await queryRunner.manager.findOne(Product, {
          where: { product_id: item.productId },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        const { price, version } = product;
        productPriceMap.set(item.productId, price);
        totalAmount += Number(price) * item.qty;

        const result = await queryRunner.query(
          `
            UPDATE product
            SET stock = stock - $1,
                version = version + 1
            WHERE product_id = $2
              AND stock >= $1
              AND version = $3
            RETURNING *;
          `,
          [item.qty, item.productId, version],
        );

        if (result.length === 0) {
          throw new Error(
            `Stock conflict or insufficient stock for product ${item.productId}`,
          );
        }
      }

      const order = await queryRunner.manager.save(Orders, {
        user,
        user_id: user.user_id,
        status: "PENDING",
        total: totalAmount,
      });

      const orderItems = items.map((item) => ({
        order,
        product: { product_id: item.productId } as Product,
        quantity: item.qty,
        price: productPriceMap.get(item.productId) ?? 0,
      }));

      await queryRunner.manager.save(OrderItem, orderItems);

      const paymentSuccess = Math.random() > 0.3;

      if (!paymentSuccess) {
        throw new Error("Payment failed");
      }

      await queryRunner.manager.save(Payment, {
        order,
        status: "SUCCESS",
        amount: totalAmount,
      });

      order.status = "COMPLETED";
      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();

      return {
        orderId: order.order_id,
        userId: order.user_id,
        status: order.status,
        total: order.total,
        items: orderItems,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
