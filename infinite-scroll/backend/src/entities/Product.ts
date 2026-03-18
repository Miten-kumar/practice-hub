import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  category!: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  price!: number;

  @CreateDateColumn()
  created_at!: Date;
}