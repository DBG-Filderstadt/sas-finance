import { Test, TestingModule } from '@nestjs/testing';
import { TerminalJobService } from './terminal-job.service';

describe('TerminalJobService', () => {
  let service: TerminalJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminalJobService],
    }).compile();

    service = module.get<TerminalJobService>(TerminalJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
