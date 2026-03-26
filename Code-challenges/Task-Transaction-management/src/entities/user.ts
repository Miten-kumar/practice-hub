import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Orders } from "./order";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({type:'varchar'})
  name!: string;

  @Column({
    type:'varchar',
    unique: true 
  })
  email!: string;

  @Column({type:'varchar'})
  password!: string; 

  @CreateDateColumn({type:'date'})
  createdAt!: Date;

  @OneToMany(() => Orders, (order) => order.user)
  orders!: Orders[];
}