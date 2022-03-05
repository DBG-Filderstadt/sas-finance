import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TransactionService } from "./transaction.service";

@Controller('transaction')
export class TransactionController{
    constructor(private readonly transactionService: TransactionService){}

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

    //Terminal fragt nach neuem Job
    //@Param terminalID
    @Get('/get/:terminalID')
    async getTransactions(@Param('terminalID') terminalID: string) {
        return await this.transactionService.getTransactions(terminalID);
    }

    //Terminal hat neuen Job und schickt RFID Nummer
    @Post('/process')
    async processTransaction(
    @Body('transactionID') transactionID: string,
    @Body('rfid') rfid: string,
    @Body('receiverID') receiverID: string,
    @Body('amount') amount: number,
    @Body('code') code: number,
    ) {
        return await this.transactionService.processTransaction(transactionID, rfid, receiverID, amount, code);
    }

    @Post('/revoke')
    async revokeTransaction(
    @Body('transactionID') transactionID: string){
        return await this.transactionService.revokeTransaction(transactionID);
    }
}