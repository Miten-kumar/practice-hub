import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders.js";

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  payment_id!: number;

  @Column({ type: "int" })
  order_id!: number;

  @OneToOne(() => Orders, (order) => order.payment)
  @JoinColumn({ name: "order_id" })
  order!: Orders;

  @Column({ type: "enum", enum: ["pending", "completed", "failed"] })
  status!: "pending" | "completed" | "failed";

  @Column({ type: "numeric" })
  amount!: number;

  @Column({ type: "varchar" })
  transaction_id!: string;
}
