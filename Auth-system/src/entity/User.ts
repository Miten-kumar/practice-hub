import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: "enum", enum: ["male", "female", "other"] })
  gender: string;

  @Column()
  age: number;

  @Column()
  password: string;
}
