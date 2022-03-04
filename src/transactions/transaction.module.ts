import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TransactionController } from './transaction.controller';
import { Transactions } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transactions]), UserModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}

