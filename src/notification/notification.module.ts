/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from '../prisma.service';
import { MailerModule } from '../mailer.module';

@Module({
  imports: [MailerModule], 
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService, MailerModule], 
  exports: [NotificationService],
})
export class NotificationModule {}