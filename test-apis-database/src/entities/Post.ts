import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./User";

@Entity({ name: "posts" })
export class Posts {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text" })
  content!: string;

  @ManyToOne(() => Users, (user) => user.posts)
  @JoinColumn({ name: "user_id" })
  user!: Users;
}
