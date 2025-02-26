import { Test, TestingModule } from '@nestjs/testing';
import { DebtLogController } from './debt-log.controller';

describe('DebtLogController', () => {
  let controller: DebtLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtLogController],
    }).compile();

    controller = module.get<DebtLogController>(DebtLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
