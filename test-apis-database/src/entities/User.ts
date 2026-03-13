import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Posts } from "./Post";

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts!: Posts[];
}
