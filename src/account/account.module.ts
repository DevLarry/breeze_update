/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/email.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, MailerService, PrismaService, JwtService],
  imports: []
})
export class AccountModule { }
