import { Entity,PrimaryGeneratedColumn,ManyToOne,Column } from "typeorm";
import { Orders } from "./order";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id!: number;

  @ManyToOne(() => Orders)
  order!: Orders;

  @Column({type:'varchar'})
  status!: 'SUCCESS' | 'FAILED';

  @Column({type:'int'})
  amount!: number;
}