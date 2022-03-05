import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalJob } from './terminal-job.entity';
import { TerminalJobService } from './terminal-job.service';

@Module({
  imports: [TypeOrmModule.forFeature([TerminalJob])],
  providers: [TerminalJobService],
  exports: [TerminalJobService],
})
export class TerminalJobModule {}
