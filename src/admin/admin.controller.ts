import { ConsoleLogger, Controller, Get, Render } from '@nestjs/common';
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
    async users(){
        const users = await this.userService.getAll();
        console.log(users);
        return{ users: users};
        } 
    
    @Get('/companys')
    @Render('admin/companys')
    companys(){
        return {};
    }

    @Get('/transactions')
    @Render('admin/transactions')
    transaction(){
        return {};
    }
}
