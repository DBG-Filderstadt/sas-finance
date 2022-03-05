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

    //Führt die sender und receiver id zusammen und leitet die Transaktion ein
    async processTransaction(transactionID, senderID, receiverID, amount, code?) {
        let state = "pending";
        let stateReason:string;
        //User -> company
        if(!code){
        code = 101;
        const senderBalance = await this.userService.getUserBalance(senderID);
        if (senderBalance > amount) {
            //wenn ja speichere Transaktion in transactionHistory Datenbank
            //buche Geld bei Sender ab und füge Geld dem Receiver hinzu
            const receiverAmount = await this.companyService.addMoney(receiverID, amount);
            const senderAmount = await this.userService.removeMoney(senderID, amount);
            state = "success";
            this.storeTransaction(transactionID, senderID, receiverID, amount, code, state);
            return {receiverAmount, senderAmount};
        }else {
            //wenn nein sende Fehler
            state = "aborted";
            stateReason = "Insufficient funds";
            this.storeTransaction(transactionID, senderID, receiverID, amount, code, state, stateReason);
            throw new UnauthorizedException("Es befindet sich nicht genügend Geld auf dem Konto");
            }
        }
        //User -> User
        if(code == 202)  {
        //Überprüfung ob Sender genügend Geld hat
        const senderBalance = await this.userService.getUserBalance(senderID);
        if (senderBalance > amount) {
            //wenn ja speichere Transaktion in transactionHistory Datenbank
            //buche Geld bei Sender ab und füge Geld dem Receiver hinzu
            const receiverAmount = await this.userService.addMoney(receiverID, amount);
            const senderAmount = await this.userService.removeMoney(senderID, amount);
            state = "success";
            this.storeTransaction(transactionID, senderID, receiverID, amount, code, state);
            return {receiverAmount, senderAmount};
        }else {
            //wenn nein sende Fehler
            state = "aborted";
            stateReason = "Insufficient funds";
            this.storeTransaction(transactionID, senderID, receiverID, amount,code, state, stateReason);
            throw new UnauthorizedException("Es befindet sich nicht genügend Geld auf dem Konto");
        }
    }
    //Company -> User
    if(code === 303) {
        //Überprüfung ob Sender genügend Geld hat
        const senderBalance = await this.userService.getUserBalance(senderID);
        if (senderBalance > amount) {
            //wenn ja speichere Transaktion in transactionHistory Datenbank
            //buche Geld bei Sender ab und füge Geld dem Receiver hinzu
            const receiverAmount = await this.userService.addMoney(receiverID, amount);
            const senderAmount = await this.companyService.removeMoney(senderID, amount);
            state = "success";
            this.storeTransaction(transactionID, senderID, receiverID, amount, code, state);
            return {receiverAmount, senderAmount};
        }else {
            //wenn nein sende Fehler
            state = "aborted";
            stateReason = "Insufficient funds";
            this.storeTransaction(transactionID, senderID, receiverID, amount,code, state, stateReason);
            throw new UnauthorizedException("Es befindet sich nicht genügend Geld auf dem Konto");
        }
    }

        
    }

    async storeTransaction(transactionID, senderID, receiverID, amount, code, state, stateReason?) {
        const transaction = new Transactions();
        transaction.receiverID = receiverID;
        transaction.senderID = senderID;
        transaction.amount = amount;
        transaction.transactionID = transactionID;
        transaction.code = code;
        transaction.status = state;
        transaction.statusReason = stateReason;
        transaction.transactionTime = new Date();
        await this.transactionRepository.save(transaction);
    }
}