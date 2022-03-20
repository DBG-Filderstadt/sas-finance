import { Body, ConsoleLogger, Controller, Get, Post, Redirect, Render, Req } from '@nestjs/common';
import { STATUS_CODES } from 'http';
import { AdminLogService } from 'src/admin-log/admin-log.service';
import { CompanyService } from 'src/company/company.service';
import { TerminalJobModule } from 'src/terminal-job/terminal-job.module';
import { TerminalJobService } from 'src/terminal-job/terminal-job.service';
import { TerminalLinksService } from 'src/terminal-links/terminal-links.service';
import { TransactionService } from 'src/transactions/transaction.service';
import { UserService } from 'src/user/user.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly userService: UserService, private readonly companyService: CompanyService, private readonly transactionService: TransactionService, private readonly adminLogService: AdminLogService, private readonly tJobService: TerminalJobService, private readonly tLinkService: TerminalLinksService){}
    @Get()
    @Render('admin/index')
    root(){
        return {};
    }

    @Get('/users')
    @Render('admin/users')
    async users( ){
        const users = await this.userService.getAll();
        return{ users: users};
        } 

    
    @Get('/companys')
    @Render('admin/companys')
    companys(){
        return {};
    }

    @Get('/transactions/revoke')
    @Render('admin/revokeTrans')
    rev(){
        return {};
    }
    @Post('/transactions/revoke')
    async newRevoke(@Body() body){
        await this.transactionService.revokeTransaction(body.transID, body.reason);
        return Redirect('/admin/transactions');
    }


    @Get('/transactions/new')
    @Render('admin/newTransaction')
    async trans(){

    }

    @Post('/transactions/new')
    async newTrans(@Body() body){
        const transactionID = Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6);
        const sender = await this.userService.getUser(body.sender);
        const receiver = await this.userService.getUser(body.receiver);
        await this.transactionService.processTransaction(transactionID, body.sender, body.receiver, body.amount, body.code, body.purpose);
        return Redirect('/admin/transactions');
    }

    @Get('/transactions')
    @Render('admin/transactions')
    async transaction(){
        const transactions = await this.transactionService.getallTransactions();
        for (let i = 0; i < transactions.length; i++){
            const transaction = transactions[i];
            const sender = await this.userService.getUser(transaction.senderID);
            const receiver = await this.userService.getUser(transaction.receiverID);
            var sName = JSON.stringify(sender.fname + " " + sender.lname);
            var rName = JSON.stringify(receiver.fname + " " + receiver.lname);
            transaction.senderName = sName.replace(/\/"/g, '/');
            transaction.receiverName = rName.replace(/\/"/g, '/');
        }
        const trans = transactions.reverse()
        return {
            transactions: trans
        };
    }
}
