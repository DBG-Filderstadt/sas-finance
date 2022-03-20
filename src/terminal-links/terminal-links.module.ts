import { Module } from '@nestjs/common';
import { TerminalLinksService } from './terminal-links.service';
import { TerminalLinksController } from './terminal-links.controller';

@Module({
  providers: [TerminalLinksService],
  controllers: [TerminalLinksController],
  exports: [TerminalLinksService]
})
export class TerminalLinksModule {}
