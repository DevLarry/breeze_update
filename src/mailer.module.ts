/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailerService } from './email.service';

@Module({
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}