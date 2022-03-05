import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TerminalJob {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transactionID: string;

    @Column()
    receiverID: string;

    @Column()
    amount: number;

    @Column()
    terminalID: string;

    @Column()
    timestamp: Date;

}