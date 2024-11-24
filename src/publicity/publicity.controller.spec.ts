import { Test, TestingModule } from '@nestjs/testing';
import { PublicityController } from './publicity.controller';

describe('PublicityController', () => {
  let controller: PublicityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicityController],
    }).compile();

    controller = module.get<PublicityController>(PublicityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
