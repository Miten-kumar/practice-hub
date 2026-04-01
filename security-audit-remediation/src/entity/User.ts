import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  firstName!: string;

  @Column({ type: "text" })
  lastName!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "int" })
  age!: number;

  @Column({ type: "text", default: "" })
  bio!: string;
}
