import { Test, TestingModule } from '@nestjs/testing';
import { PetHistoryController } from './pet-history.controller';
import { PetHistoryService } from './pet-history.service';

describe('PetHistoryController', () => {
  let controller: PetHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetHistoryController],
      providers: [PetHistoryService],
    }).compile();

    controller = module.get<PetHistoryController>(PetHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
