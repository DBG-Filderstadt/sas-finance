import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserModule } from 'src/user/user.module';
import { AdminLogModule } from 'src/admin-log/admin-log.module';

@Module({
  imports: [UserModule, AdminLogModule],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports:[CompanyService]
})
export class CompanyModule {}
