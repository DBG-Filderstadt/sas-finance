import { Injectable } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { UserService } from "src/user/user.service";

@Injectable()
export class TransactionService {
    constructor(private readonly userService: UserService) {}

    async createTransaction(terminalID, receiverID, amount, transactionID) {
        //table Jobs in database

        return null;
    }

    async getTransactions(terminalID) {
        //Suche Job für Terminal aus Datenbank und gebe diesen zurück
        const amount = 100;
        const transactionID = "12345";
        const receiverID = "12345";
        const job = {
            amount,
            transactionID,
            terminalID,
            receiverID,
        };

        return job;
    }

    //Führt die sender und receiver id zusammen und leitet die Transaktion ein
    async processTransaction(transactionID, senderID, receiverID, amount) {
        let state = "pending";
        
        //Überprüfung ob Sender genügend Geld hat
        const senderBalance = await this.userService.getUserBalance(senderID);
        if (senderBalance > amount) {
            //wenn ja speichere Transaktion in transactionHistory Datenbank
            //buche Geld bei Sender ab und füge Geld dem Receiver hinzu
            const receiverAmount = await this.userService.addMoney(senderID, amount);
            const senderAmount = await this.userService.removeMoney(receiverID, amount);
            state = "success";
            this.storeTransaction(transactionID, senderID, receiverID, amount, state);
            return {receiverAmount, senderAmount};
        }else {
            //wenn nein sende Fehler
            state = "error";
            this.storeTransaction(transactionID, senderID, receiverID, amount, state);
            return {status: STATUS_CODES.BAD_REQUEST, message: "Sender hat nicht genug Geld"};
        }
        

        
    }

    async storeTransaction(transactionID, senderID, receiverID, amount, state) {
        //speichere Transaktion in Datenbank
    }
}