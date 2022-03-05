import { Test, TestingModule } from '@nestjs/testing';
import { TerminalLinksController } from './terminal-links.controller';

describe('TerminalLinksController', () => {
  let controller: TerminalLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerminalLinksController],
    }).compile();

    controller = module.get<TerminalLinksController>(TerminalLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
