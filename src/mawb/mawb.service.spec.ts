import { Test, TestingModule } from '@nestjs/testing';
import { MawbService } from './mawb.service';

describe('MawbService', () => {
  let service: MawbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MawbService],
    }).compile();

    service = module.get<MawbService>(MawbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
