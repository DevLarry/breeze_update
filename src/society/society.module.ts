import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';

@Module({
  controllers: [SocietyController],
  providers: [SocietyService],
})
export class SocietyModule {}
