import { Test, TestingModule } from '@nestjs/testing';
import { MawbController } from './mawb.controller';
import { MawbService } from './mawb.service';

describe('MawbController', () => {
  let controller: MawbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MawbController],
      providers: [MawbService],
    }).compile();

    controller = module.get<MawbController>(MawbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
