import { Test, TestingModule } from '@nestjs/testing';
import { DebtLogService } from './debt-log.service';

describe('DebtLogService', () => {
  let service: DebtLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtLogService],
    }).compile();

    service = module.get<DebtLogService>(DebtLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
