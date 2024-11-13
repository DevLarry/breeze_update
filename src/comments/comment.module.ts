/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [CommentService, PrismaService, JwtService],
  controllers: [CommentController],
})
export class CommentModule {}
