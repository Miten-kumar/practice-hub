import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" }) // keeping exact table name from your DB
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 20 })
  mobile_no: string;

  @Column({ type: "varchar", length: 255 })
  password: string;
}
