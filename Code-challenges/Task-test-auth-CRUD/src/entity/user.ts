import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length } from "class-validator";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type:"varchar",
        unique:true,
        length: 255,
        nullable:false
    })
    email!: string;

    @Column({
        type:"varchar",
        length:20,
        nullable:false
    })
    @Length(3,20,{
        message:"first_name should be between 3-20 characters"
    })
    first_name!: string;
    
    @Column({
        type:"varchar",
        length:20,
        nullable:false
    })
    @Length(3,20,{
        message:"last_name should be between 3-20 characters"
    })
    last_name!: string;

    @Column({
        type:"varchar",
        unique:true,        
        nullable:false
    })
    phone_number!: string;

    @Column({
        type:"int",
        nullable:false
    })
    @Length(12,75,{
        message:"age should be between 12-75 characters"
    })
    age!: number;

    @Column({
        type:"enum",
        enum:Gender,
        nullable:false
    })
    gender!: Gender;

    @Column({
        type:"varchar",
        nullable:false
    })
    password!: string;
}
