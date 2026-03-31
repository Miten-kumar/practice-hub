import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text', unique: true })
    email!: string;

    @Column({ type: 'text' })
    first_name!: string;

    @Column({ type: 'text' })
    last_name!: string;

    @Column({ type: 'text', unique: true })
    contact_number!: string;

    @Column({ type: 'integer'})
    age!: number;

    @Column({ type: 'text' })
    gender!: string;

    @Column({ type: 'text' })   
    password!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}