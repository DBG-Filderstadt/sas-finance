import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserService],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports:[CompanyService]
})
export class CompanyModule {}
