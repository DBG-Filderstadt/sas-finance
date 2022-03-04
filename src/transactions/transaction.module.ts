import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { Transactions } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transactions])],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}

