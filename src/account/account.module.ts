/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/email.service';
import { AuthService } from 'src/auth/auth.service';
@Module({
  controllers: [AccountController],
  providers: [AccountService, MailerService, PrismaService, JwtService,AuthService],
  imports: []
})
export class AccountModule { }
