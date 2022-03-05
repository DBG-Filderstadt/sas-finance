import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalJobModule } from 'src/terminal-job/terminal-job.module';
import { UserModule } from 'src/user/user.module';
import { TransactionController } from './transaction.controller';
import { Transactions } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transactions]), UserModule, TerminalJobModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}

