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

    @Column({nullable: true})
    code: string;

    @Column()
    transactionID: string;

    @Column({nullable: true})
    statusReason: string;

    @Column()
    status: string;

    @Column({nullable: true})
    purpose: string;

    @Column()
    transactionTime: Date;

}