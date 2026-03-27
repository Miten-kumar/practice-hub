import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Orders } from "./Orders.js";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ type: "varchar" })
  firstName!: string;

  @Column({ type: "varchar" })
  lastName!: string;

  @Column({ type: "varchar" })
  email!: string;

  @OneToMany(() => Orders, (order) => order.user)
  orders!: Orders[];
}
