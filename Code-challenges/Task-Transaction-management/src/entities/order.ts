import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn , ManyToOne} from "typeorm";
import { Users } from "./user";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column({type:'int'})
  user_id!: number;

  @Column({type:'varchar'})
  status!: 'PENDING' | 'COMPLETED' | 'FAILED';

  @Column({type:'int'})
  total!: number;

  @ManyToOne(() => Users, (user) => user.orders)
  user!: Users; 

  @CreateDateColumn()
  version!: number;
}