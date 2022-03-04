import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company{
    @PrimaryGeneratedColumn()
    id: number;
}