import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    receiverID: string;

    @Column()
    senderID: string;

    @Column()
    amount: number;

    @Column()
    byBankID?: string;

    @Column()
    transactionID: string;

    @Column()
    statusReason: string;

    @Column()
    status: string;

    @Column()
    purpose: string;

    @Column()
    transactionTime: Date;

}