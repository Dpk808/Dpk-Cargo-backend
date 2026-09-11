import { Test, TestingModule } from '@nestjs/testing';
import { HawbController } from './hawb.controller';
import { HawbService } from './hawb.service';

describe('HawbController', () => {
  let controller: HawbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HawbController],
      providers: [HawbService],
    }).compile();

    controller = module.get<HawbController>(HawbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
