import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  payment_id!: number;

  @Column({ type: "int" })
  order_id!: number;

  @Column({ type: "enum", enum: ["pending", "completed", "failed"] })
  status!: "pending" | "completed" | "failed";

  @Column({ type: "numeric" })
  amount!: number;

  @Column({ type: "varchar" })
  transaction_id!: string;
}
