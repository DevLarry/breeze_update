/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaClient } from '@prisma/client';
import { Account } from './entities/account.entity';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { MailerService } from 'src/email.service';
import { generateOtp } from './otp.utils';
import { v4 as uuidv4 } from 'uuid';
import {BadRequestException,
NotFoundException,
} from '@nestjs/common';

export const saltOrRounds = 10;
@Injectable()
export class AccountService {
  constructor(
    private prismaService: PrismaService,
    private emailService: MailerService,
  ) {}

    async create(createAccountDto: CreateAccountDto) {
      if (!createAccountDto.password || typeof createAccountDto.password !== 'string') {
        throw new BadRequestException('Password is required and must be a string');
      }
      
      if (!createAccountDto.email) {
        throw new BadRequestException('Email is required');
      }
      
      if (!createAccountDto.name) {
        throw new BadRequestException('Name is required');
      }
    
      const code = generateOtp();
      const verificationToken = uuidv4();
      const hash = await bcrypt.hash(createAccountDto.password, saltOrRounds);
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3021';
      
      try {
        const user = { 
          ...createAccountDto, 
          password: hash, 
          verification_code: code,
          verification_token: verificationToken,
        };
        
        const account = await this.prismaService.account.create({ data: user });
        const verificationLink = `${frontendUrl}/api/auth/verify?token=${verificationToken}`;
      
        const emailResult = await this.emailService.sendConfirmationEmail(
          createAccountDto.email,
          code,
          verificationLink,
        );
        
        if (!emailResult) {
          await this.prismaService.account.delete({ where: { id: account.id } });
          throw new BadRequestException('Failed to send confirmation email');
        }
        
        const { password, ...result } = account;
        return result;
      } catch (err) {
        if (err.code === 'P2002') {
          throw new BadRequestException('Account already exists! Use a different email.');
        }
        throw new BadRequestException(err.message || 'Failed to create account');
      }
    }

  async verifyByToken(token: string) {
    const account = await this.prismaService.account.findFirst({
      where: { verification_token: token },
    });

    if (!account) {
      throw new Error('Invalid or expired verification token');
    }

    if (account.is_verified) {
      return { message: 'Account already verified' };
    }

    await this.prismaService.account.update({
      where: { id: account.id },
      data: { is_verified: true, verification_token: null, verification_code: null },
    });
    return { message: 'Account verified successfully' };
  }
  async testMail() {
    const emailResult = await this.emailService.sendConfirmationEmail(
      'test.email@estor.com',
      '122323',
    );
    // if (!emailResult)
    //   return "Failed to send Email!"
    // return "Success";
    return emailResult;
  }

  async findAll(page: number = 1, counts: number = 10, search: string = '') {
    if (page < 1) page = 1;
    let where = {};
    if (search) {
      where = {
        OR: [
          { firstname: { contains: search } },
          { lastname: { contains: search } },
          { email: { contains: search } },
        ],
      };
    }
    const accounts = await this.prismaService.account.findMany({
      skip: (page - 1) * counts,
      take: counts,
      where,
    });
    const count = await this.prismaService.account.count({ where });
    return {
      accounts: accounts.map((e) => {
        delete e.password;
        return e;
      }),
      count,
    };
  }
  async findByEmail(email: string) {
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email provided');
    }
    return this.prismaService.account.findUnique({ where: { email } });
  }

  async findOne(id: number) {
    return this.prismaService.account.findUnique({ where: { id } });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    if (updateAccountDto.password) {
      updateAccountDto.password = await bcrypt.hash(updateAccountDto.password, saltOrRounds);
    }
    return this.prismaService.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.account.delete({ where: { id } });
  }
}