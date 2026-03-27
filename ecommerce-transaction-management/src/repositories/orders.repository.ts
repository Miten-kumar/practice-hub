import { AppDataSource } from "../data-source.js";
import { Orders } from "../entity/Orders.js";
import type { IOrder } from "../types/order.js";
import type { EntityManager } from "typeorm";

export class OrderRepository {
  orderRepository = AppDataSource.getRepository(Orders);

  createOrder(orderDetails: IOrder, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(Orders) : this.orderRepository;
    const order = repository.create(orderDetails);

    return repository.save(order);
  }
}
