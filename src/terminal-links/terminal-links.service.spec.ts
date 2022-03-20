import { Test, TestingModule } from '@nestjs/testing';
import { TerminalLinksService } from './terminal-links.service';

describe('TerminalLinksService', () => {
  let service: TerminalLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminalLinksService],
    }).compile();

    service = module.get<TerminalLinksService>(TerminalLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
