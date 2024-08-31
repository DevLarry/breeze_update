/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; 
import { PrismaService } from '../prisma.service';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
  // imports: [
  //   JwtModule.register({
  //     secret: process.env.JWT_SECRET,
  //     signOptions: { expiresIn: '60s' },
  //   }),
  // ],
  providers: [PostService, PrismaService, AuthGuard],
  controllers: [PostController],
})
export class PostModule {}
