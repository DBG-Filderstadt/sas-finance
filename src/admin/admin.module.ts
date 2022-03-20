import { Module } from '@nestjs/common';
import { AdminLogModule } from 'src/admin-log/admin-log.module';
import { CompanyModule } from 'src/company/company.module';
import { TerminalJobModule } from 'src/terminal-job/terminal-job.module';
import { TerminalLinksModule } from 'src/terminal-links/terminal-links.module';
import { TransactionModule } from 'src/transactions/transaction.module';
import { UserModule } from 'src/user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule, CompanyModule, TerminalJobModule, TransactionModule, AdminLogModule, TerminalLinksModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
