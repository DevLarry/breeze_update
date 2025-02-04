import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SocietyController],
  providers: [SocietyService, PrismaService],
})
export class SocietyModule {}
