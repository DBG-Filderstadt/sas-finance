import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transactions/transaction.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { TerminalJobModule } from './terminal-job/terminal-job.module';
import { AdminLogModule } from './admin-log/admin-log.module';
import { AdminModule } from './admin/admin.module';
import { TerminalLinksModule } from './terminal-links/terminal-links.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    
      type: "mysql",
      host: "zap326159-1.plesk09.zap-webspace.com",
      port: 3306,
      username: "sasdbg",
      password: "SAS-DB3-NEST",
      database: "sas",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
  }), TransactionModule, UserModule, CompanyModule, TerminalJobModule, AdminLogModule, AdminModule, TerminalLinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
