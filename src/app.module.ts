import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transactions/transaction.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { TerminalJobModule } from './terminal-job/terminal-job.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    
      type: "mysql",
      host: "db4free.net",
      port: 3306,
      username: "dbgsas",
      password: "SAS-DB3-NEST",
      database: "staatsdb",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
  }), TransactionModule, UserModule, CompanyModule, TerminalJobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
