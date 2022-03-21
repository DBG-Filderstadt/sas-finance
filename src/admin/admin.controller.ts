import { Body, Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
import { AdminLogService } from 'src/admin-log/admin-log.service';
import { CompanyService } from 'src/company/company.service';
import { TerminalJobModule } from 'src/terminal-job/terminal-job.module';
import { TerminalJobService } from 'src/terminal-job/terminal-job.service';
import { TerminalLinksService } from 'src/terminal-links/terminal-links.service';
import { Transactions } from 'src/transactions/transaction.entity';
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
    @Get('/transactions')
    @Render('admin/transactions')
        async transaction(){
            const transactions = await this.transactionService.getallTransactions();
            for (let i = 0; i < transactions.length; i++){
                const transaction = transactions[i];
                let sender;
                let receiver;
                if(transaction.code === "202"){
                     sender = await this.userService.getUser(transaction.senderID);
                     receiver = await this.userService.getUser(transaction.receiverID);
                }
                if(transaction.code === "101"){
                    sender = await this.userService.getUser(transaction.senderID);
                    receiver = await this.companyService.getCompany(transaction.receiverID);
               }

               if(transaction.code === "303"){
                sender = await this.companyService.getCompany(transaction.senderID);
                receiver = await this.companyService.getCompany(transaction.receiverID);
           }
                console.log(sender)
                var sName = JSON.stringify(sender.name);
                var rName = JSON.stringify(receiver.name);
                transaction.senderName = sName.replace(/\"/g, "");
                transaction.receiverName = rName.replace(/\"/g, "");
            }
            const trans = transactions.reverse()
            return {
                transactions: trans
            };
        }
    
    @Get('/companys')
    @Render('admin/companys')
    companys(){
        return {};
    }

    @Get('/transactions/revoke')
    @Redirect('/admin/transactions/')
    red(){
    }

    @Get('/transactions/revoke/:id')
    @Render('admin/revokeTrans')
    rev(@Param('id')id: string){
        return {
            id: id
        };
    }
    @Post('/transactions/revoke/:id')
    @Redirect('/admin/transactions/')
    async newRevoke(@Body() body){
        await this.transactionService.revokeTransaction(body.transID, body.reason);
        return;
    }



    @Get('/transactions/new/:id')
    @Render('admin/newTransaction')
    async transTemplate(@Param('id') id: string){
        var transaction: Transactions = await this.transactionService.getTransactionbyTransactionID(id)
        return{
            transaction: transaction,
        }


    }

    @Post('/transactions/new/:id')
    @Redirect('/admin/transactions/')
    async newTrans(@Body() body){
        const transactionID = Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6);

        await this.transactionService.processTransaction(transactionID, body.sender, body.receiver, body.amount, body.code, body.purpose);
    }

    
}
