import { OrdersRepository } from "../repositories/orders.repository.js";

export class OrdersService {
  private ordersRepository: OrdersRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  async createOrder(user_id: string, product_id: string, quantity: number) {
    return this.ordersRepository.create({
      user_id,
      product_id,
      quantity,
    } as any);
  }

  async getOrderById(order_id: string) {
    return this.ordersRepository.findById(order_id);
  }
  async updateOrder(
    order_id: string,
    user_id?: string,
    product_id?: string,
    quantity?: number,
  ) {
    const updateData: Partial<{
      user_id: string;
      product_id: string;
      quantity: number;
    }> = {};
    if (user_id) updateData.user_id = user_id;
    if (product_id) updateData.product_id = product_id;
    if (quantity !== undefined) updateData.quantity = quantity;
    return this.ordersRepository.update(order_id, updateData);
  }

  async deleteOrder(order_id: string) {
    await this.ordersRepository.delete(order_id);
  }
}
