import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    product_id!: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name!: string;

    @Column({
        type: "varchar",
        unique: true,
        length: 255,
        nullable: false,
    })
    title!: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    description!: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price!: number;
}
