import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type:"varchar",
        length: 255,
        nullable:false
    })
    name!: string;
}
