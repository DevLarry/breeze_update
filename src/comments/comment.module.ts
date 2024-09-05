/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  providers: [CommentService, PrismaService],
  controllers: [CommentController],
})
export class CommentModule {}
