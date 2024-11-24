/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PublicityService } from './publicity.service';
import { PublicityController } from './publicity.controller';
import { PrismaService } from 'src/prisma.service';
import { MailerModule } from '../mailer.module'; 
import { NotificationModule } from '../notification/notification.module';
import { PostModule } from '../post/post.module';
import { JwtModule } from '@nestjs/jwt'; 

@Module({
  imports: [
    MailerModule, 
    NotificationModule,
    PostModule,
    JwtModule.register({
      secret: '',
      signOptions: { expiresIn: '60m' }
    })
  ],
  controllers: [PublicityController],
  providers: [
    PublicityService, 
    PrismaService
  ],
  exports: [PublicityService]
})
export class PublicityModule {}