import { Entity,PrimaryGeneratedColumn,ManyToOne,Column } from "typeorm";
import { Orders } from "./order";
import { Product } from "./product";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItem_id!: number;

  @ManyToOne(() => Orders)
  order!: Orders;

  @ManyToOne(() => Product)
  product!: Product;

  @Column({type:"int"})
  quantity!: number;

  @Column({type:'int'})
  price!: number;
}