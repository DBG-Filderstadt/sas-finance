import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { UserModule } from 'src/user/user.module';
import { AdminLogController } from './admin-log.controller';
import { AdminLog } from './admin-log.entity';
import { AdminLogService } from './admin-log.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([AdminLog]), forwardRef(() => CompanyModule)],
  controllers: [AdminLogController],
  providers: [AdminLogService],
  exports: [AdminLogService, TypeOrmModule]
})
export class AdminLogModule {}
