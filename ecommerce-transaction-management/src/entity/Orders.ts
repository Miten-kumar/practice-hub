import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column({ type: "int" })
  user_id!: number;

  @Column({ type: "enum", enum: ["pending", "completed", "failed"] })
  status!: "pending" | "completed" | "failed";

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}
