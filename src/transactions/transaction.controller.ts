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
    @Get(':terminalID')
    async getTransactions(@Param('terminalID') terminalID: string) {
        return await this.transactionService.getTransactions(terminalID);
    }

    //Terminal hat neuen Job und schickt RFID Nummer
    @Post('/process')
    async processTransaction(
    @Body('transactionID') terminalID: string,
    @Body('rfid') rfid: string,
    ) {
        return await this.transactionService.processTransaction(terminalID, rfid);
    }
}