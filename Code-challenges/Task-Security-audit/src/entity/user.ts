import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type:"varchar"})
  username!: string;

  @Column({type:"varchar"})
  password!: string; 

  @Column({ default: "user",type:"varchar" })
  role!: string;
}