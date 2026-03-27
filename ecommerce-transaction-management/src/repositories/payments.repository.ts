import { AppDataSource } from "../data-source.js";
import { Payments } from "../entity/Payments.js";
import type { EntityManager } from "typeorm";

export class PaymentRepository {
  paymentRepository = AppDataSource.getRepository(Payments);

  createPayment(paymentDetails: Partial<Payments>, manager?: EntityManager) {
    const repository = manager
      ? manager.getRepository(Payments)
      : this.paymentRepository;
    const payment = repository.create(paymentDetails);

    return repository.save(payment);
  }
}
