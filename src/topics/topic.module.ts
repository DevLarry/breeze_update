/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TopicService } from './topics.service';
import { TopicController } from './topic.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

  @Module({
    imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '120s' },
      }),
  
    ],
  controllers: [TopicController],
  providers: [TopicService, PrismaService],
})
export class TopicModule {}
