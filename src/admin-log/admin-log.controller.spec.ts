import { Test, TestingModule } from '@nestjs/testing';
import { AdminLogController } from './admin-log.controller';

describe('AdminLogController', () => {
  let controller: AdminLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminLogController],
    }).compile();

    controller = module.get<AdminLogController>(AdminLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
