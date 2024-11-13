import { Test, TestingModule } from '@nestjs/testing';
import { SocietyController } from './society.controller';
import { SocietyService } from './society.service';

describe('SocietyController', () => {
  let controller: SocietyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocietyController],
      providers: [SocietyService],
    }).compile();

    controller = module.get<SocietyController>(SocietyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
