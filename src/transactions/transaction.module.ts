import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { TerminalJobModule } from 'src/terminal-job/terminal-job.module';
import { UserModule } from 'src/user/user.module';
import { TransactionController } from './transaction.controller';
import { Transactions } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transactions]), UserModule, TerminalJobModule, CompanyModule],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService]
})
export class TransactionModule {}

