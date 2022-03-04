import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}

