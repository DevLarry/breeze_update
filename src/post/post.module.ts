/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthService } from 'src/auth/auth.service';
import { AccountService } from 'src/account/account.service';
import { MailerService } from 'src/email.service';
import { TagModule } from '../tags/tag.module';
import { NotificationModule } from '../notification/notification.module';
import { PrismaService } from '../prisma.service'; // Add PrismaService as a provider

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
    TagModule,
    NotificationModule,
  ],
  providers: [
    PostService,
    PrismaService, 
    AuthService,
    AccountService,
    MailerService,
  ],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
