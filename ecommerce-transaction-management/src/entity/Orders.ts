import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./Users.js";
import { Products } from "./Products.js";
import { Payments } from "./Payments.js";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column({ type: "int" })
  user_id!: number;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user!: Users;

  @Column({ type: "int" })
  prod_id!: number;

  @ManyToOne(() => Products, (product) => product.orders)
  @JoinColumn({ name: "prod_id" })
  product!: Products;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "enum", enum: ["pending", "completed", "failed"] })
  status!: "pending" | "completed" | "failed";

  @OneToOne(() => Payments, (payment) => payment.order)
  payment!: Payments;

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}
