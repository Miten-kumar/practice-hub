import { Entity, PrimaryGeneratedColumn, Column ,VersionColumn} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id!: number;

  @Column({type:'varchar'})
  name!: string;

  @Column({type:'int'})
  stock!: number;

  @Column({type:'int'})
  price!: number;

  @VersionColumn({type:'int',nullable:false})
  version!: number;
}