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
    owner: string;

    @Column()
    ownerClass: string;

    @Column()
    ownerID: string;

    @Column()
    balance: number;

    @Column()
    isLocked: boolean;

    @Column()
    lastUsed: Date;
}