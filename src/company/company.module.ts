import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports:[CompanyService]
})
export class CompanyModule {}
