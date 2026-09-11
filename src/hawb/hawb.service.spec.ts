import { Test, TestingModule } from '@nestjs/testing';
import { HawbService } from './hawb.service';

describe('HawbService', () => {
  let service: HawbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HawbService],
    }).compile();

    service = module.get<HawbService>(HawbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
