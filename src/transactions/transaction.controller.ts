import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TransactionService } from "./transaction.service";

@Controller('transaction')
export class TransactionController{
    constructor(private readonly transactionService: TransactionService){}

    
    //Terminal hat neuen Job und schickt RFID Nummer
    @Post('/process')
    async processTransaction(
    @Body('transactionID') transactionID: string,
    @Body('rfid') rfid: string,
    @Body('receiverID') receiverID: string,
    @Body('amount') amount: number,
    @Body('code') code: number,
    @Body('purpose') purpose: string,
    ) {
        return await this.transactionService.processTransaction(transactionID, rfid, receiverID, amount, code, purpose);
    }


    //neue Transaktion wird angefragt
    @Post('/new')
    async createTransaction(
    @Body('terminalID') terminalID: string,
    @Body('receiverID') receiverID: string,
    @Body('amount') amount: number,
    @Body('transactionID') transactionID: string,
    ) {
        return await this.transactionService.createTransaction(terminalID, receiverID, amount, transactionID);
    }

    @Get('/get')
    async getTransaction() {
        return await this.transactionService.getallTransactions();
    }

    @Get('/getbyTransactionID/:transactionID')
    async getTransactionByTransactionID(@Param('transactionID') transactionID: string) {    
        return await this.transactionService.getTransactionbyTransactionID(transactionID);
    }

    //Terminal fragt nach neuem Job
    //@Param terminalID
    @Get('/get/:terminalID')
    async getTransactions(@Param('terminalID') terminalID: string) {
        return await this.transactionService.getTransactions(terminalID);
    }

    @Post('/revoke')
    async revokeTransaction(
    @Body('transactionID') transactionID: string){
        return await this.transactionService.revokeTransaction(transactionID);
    }
}