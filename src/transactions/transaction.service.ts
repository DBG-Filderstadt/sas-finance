import { Injectable, UnauthorizedException } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { CompanyService } from "src/company/company.service";
import { TerminalJobService } from "src/terminal-job/terminal-job.service";
import { UserService } from "src/user/user.service";
import { Connection, Repository } from "typeorm";
import { Transactions } from "./transaction.entity";

@Injectable()
export class TransactionService {
    transactionRepository: Repository<Transactions>;
    constructor(private readonly userService: UserService, private readonly jobService: TerminalJobService, private connection: Connection, private readonly companyService: CompanyService) {
        this.transactionRepository = connection.getRepository(Transactions);
    }

    async createTransaction(terminalID, receiverID, amount, transactionID) {
        //table Jobs in database
        await this.jobService.insertJob(transactionID, terminalID, receiverID, amount);

        return null;
    }

    async getTransactions(terminalID) {
        const job = await this.jobService.getJob(terminalID);
        await this.jobService.deleteJob(terminalID);
        if(job){
        return job;
        }else {
            return null;
        }
    }

    async getTransactionsByUserID(userID) {
        const transactions = await this.transactionRepository
        .createQueryBuilder("transaction")
        .where("transaction.receiverID = :userID", { userID: userID })
        .orWhere("transaction.senderID = :userID", { userID: userID })
        .take(10)
        .getMany();
        return transactions;
    }

    async getTransactionbyTransactionID(transactionID) {
        const transaction = await this.transactionRepository
        .createQueryBuilder("transaction")
        .where("transaction.transactionID = :transactionID", { transactionID: transactionID })
        .getOne();
        return transaction;
    }
    


    async getallTransactions() {
        const transactions = await this.transactionRepository
        .createQueryBuilder("transaction")
        .cache(3000)
        .getMany();
        return transactions;
    }


    //Führt die sender und receiver id zusammen und leitet die Transaktion ein
    async processTransaction(transactionID, senderID, receiverID, amount, code, purpose?) {
        let state = "pending";
        let stateReason:string;
        //User -> company
        if(code === "101"){
        const senderBalance = await this.userService.getUserBalance(senderID);
        if (senderBalance > amount) {
            //wenn ja speichere Transaktion in transactionHistory Datenbank
            //buche Geld bei Sender ab und füge Geld dem Receiver hinzu
            const receiverAmount = await this.companyService.addMoney(receiverID, amount);
            const senderAmount = await this.userService.removeMoney(senderID, amount);
            state = "success";
            this.storeTransaction(transactionID, senderID, receiverID, amount, code, state, null, purpose);
            return {receiverAmount, senderAmount};
        }else {
            //wenn nein sende Fehler
            state = "aborted";
            stateReason = "Insufficient funds";
            this.storeTransaction(transactionID, senderID, receiverID, amount, code, state, stateReason, purpose);
            return "Es befindet sich nicht genügend Geld auf dem Konto";
            }
        }
        //User -> User
        if(code === "202")  {
        //Überprüfung ob Sender genügend Geld hat
        const senderBalance = await this.userService.getUserBalance(senderID);
        if (senderBalance > amount || senderBalance === amount) {
            //wenn ja speichere Transaktion in transactionHistory Datenbank
            //buche Geld bei Sender ab und füge Geld dem Receiver hinzu
            const receiverAmount = await this.userService.addMoney(receiverID, amount);
            const senderAmount = await this.userService.removeMoney(senderID, amount);
            state = "success";
            this.storeTransaction(transactionID, senderID, receiverID, amount, code, state, null, purpose);
            return {receiverAmount, senderAmount};
        }else {
            //wenn nein sende Fehler
            state = "aborted";
            stateReason = "Insufficient funds";
            this.storeTransaction(transactionID, senderID, receiverID, amount,code, state, stateReason, purpose);
            return "Es befindet sich nicht genügend Geld auf dem Konto";
        }
    }
    //Company -> User
    if(code === "303") {
        //Überprüfung ob Sender genügend Geld hat
        const senderBalance = await this.companyService.getBalance(senderID);
        if (senderBalance > amount) {
            //wenn ja speichere Transaktion in transactionHistory Datenbank
            //buche Geld bei Sender ab und füge Geld dem Receiver hinzu
            const receiverAmount = await this.userService.addMoney(receiverID, amount);
            const senderAmount = await this.companyService.removeMoney(senderID, amount);
            state = "success";
            this.storeTransaction(transactionID, senderID, receiverID, amount, code, state, null, purpose);
            return {receiverAmount, senderAmount};
        }else {
            //wenn nein sende Fehler
            state = "aborted";
            stateReason = "Insufficient funds";
            this.storeTransaction(transactionID, senderID, receiverID, amount,code, state, stateReason, purpose);
            return "Es befindet sich nicht genügend Geld auf dem Konto";
        }
    }

        
    }

    async revokeTransaction(transactionID, revokeReason?) {
        const transaction = await this.transactionRepository
        .createQueryBuilder("transaction")
        .where("transaction.transactionID = :transactionID", { transactionID: transactionID })
        .getOne();
        if(transaction.status === "aborted" || transaction.status === "revoked"){
            return "Transaction already revoked";
        }
        transaction.status = "revoked";
        transaction.statusReason = revokeReason;
        const receiverID = transaction.receiverID;
        const senderID = transaction.senderID;
        const amount = transaction.amount;
        const code = transaction.code;
        if(code === "101"){
        await this.userService.addMoney(senderID, amount);
        await this.companyService.removeMoney(receiverID, amount);
        }
        if(code === "202"){
            await this.userService.addMoney(senderID, amount);
            await this.userService.removeMoney(receiverID, amount);
        }
        if(code === "303"){
            await this.companyService.addMoney(senderID, amount);
            await this.userService.removeMoney(receiverID, amount);
        }
        await this.transactionRepository.save(transaction);
        return transaction;
    }
    async storeTransaction(transactionID, senderID, receiverID, amount, code, state, stateReason?, purpose?) {
        const transaction = new Transactions();
        transaction.receiverID = receiverID;
        transaction.senderID = senderID;
        transaction.amount = amount;
        transaction.transactionID = transactionID;
        transaction.code = code;
        transaction.status = state;
        transaction.statusReason = stateReason;
        transaction.purpose = purpose;
        transaction.transactionTime = new Date().toISOString();
        await this.transactionRepository.save(transaction);
    }
}