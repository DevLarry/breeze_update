/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { AccountService } from 'src/account/account.service';
import { MailerService } from 'src/email.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  providers: [
    PostService,
    PrismaService,
    AuthService,
    AccountService,
    MailerService,
  ],
  controllers: [PostController],
})
export class PostModule {}
