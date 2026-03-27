import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Orders } from "./Orders.js";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  prod_id!: number;

  @Column({ type: "varchar" })
  prod_name!: string;

  @Column({ type: "int" })
  stock!: number;

  @Column({ type: "numeric" })
  price!: number;

  @Column({ type: "int" })
  version!: number;

  @OneToMany(() => Orders, (order) => order.product)
  orders!: Orders[];
}
