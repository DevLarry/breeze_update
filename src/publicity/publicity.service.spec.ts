import { Test, TestingModule } from '@nestjs/testing';
import { PublicityService } from './publicity.service';

describe('PublicityService', () => {
  let service: PublicityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicityService],
    }).compile();

    service = module.get<PublicityService>(PublicityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
