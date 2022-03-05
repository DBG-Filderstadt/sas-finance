import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminLog{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    actorID: string;

    @Column({nullable: true})
    reciverID: string;

    @Column()
    action: string;

    @Column()
    message: string;

    @Column()
    status: string;

    @Column()
    time: Date;
}