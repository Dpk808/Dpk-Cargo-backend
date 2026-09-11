import { Test, TestingModule } from '@nestjs/testing';
import { ConsigneeService } from './consignee.service';

describe('ConsigneeService', () => {
  let service: ConsigneeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsigneeService],
    }).compile();

    service = module.get<ConsigneeService>(ConsigneeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
