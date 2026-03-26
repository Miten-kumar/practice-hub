import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  prod_id!: number;

  @Column({ type: "varchar" })
  prod_name!: string;

  @Column({ type: "int" })
  stock!: number;

  @Column({ type: "numeric" })
  price!: number;

  @Column({ type: "int" })
  version!: number;
}
