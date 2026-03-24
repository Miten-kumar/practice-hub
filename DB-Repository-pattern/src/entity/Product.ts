import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn({ name: "prod_id" })
  prod_id: number;

  @Column({ name: "prod_name", type: "varchar", length: 255 })
  prod_name: string;

  @Column({ name: "prod_description", type: "text", nullable: true })
  prod_description: string;

  @Column({ name: "price", type: "numeric", precision: 10, scale: 2 })
  price: number;

  @Column({ name: "stock", type: "int" })
  stock: number;
}
