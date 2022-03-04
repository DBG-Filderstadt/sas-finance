import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chipID: string;

    @Column()
    name: string;

    @Column()
    ownerID: string;

    @Column({nullable: true})
    balance: number;

    @Column()
    isLocked: boolean;

    @Column()
    lastUsed: Date;
}