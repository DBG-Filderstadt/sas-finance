import { Injectable } from "@nestjs/common";
import { STATUS_CODES } from "http";

@Injectable()
export class TransactionService {
    constructor() {}

    async createTransaction(terminalID, receiverID, amount, transactionID) {
        //table Jobs in database

        return null;
    }

    async getTransactions(terminalID) {
        //Suche Job für Terminal aus Datenbank und gebe diesen zurück
        const amount = 100;
        const transactionID = "12345";
        const job = {
            amount,
            transactionID,
            terminalID
        };

        return job;
    }

    async processTransaction(terminalID, rfid) {
        //Führt die sender und receiver id zusammen und leitet die Transaktion ein

        //Überprüfung ob Sender genügend Geld hat

        //wenn ja speichere Transaktion in transactionHistory Datenbank
            //und buche Geld bei Sender und füge Geld dem Receiver hinzu
            const newAmount = 100;

        //wenn nein sende Fehler

        return newAmount;
    }
}