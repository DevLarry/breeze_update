import { Test, TestingModule } from '@nestjs/testing';
import { SocietyService } from './society.service';

describe('SocietyService', () => {
  let service: SocietyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocietyService],
    }).compile();

    service = module.get<SocietyService>(SocietyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
