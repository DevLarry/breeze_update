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

export const saltOrRounds = 10;

@Injectable()
export class AccountService {
  constructor(
    private prismaService: PrismaService,
    private emailService: MailerService,
  ) {}
  async create(createAccountDto: CreateAccountDto, res) {
    let user: CreateAccountDto = createAccountDto;
    user.email = createAccountDto.email;
    const code = generateOtp();
    // user;
    const hash = await bcrypt.hash(createAccountDto.password, saltOrRounds);
    user.password = hash;

    await this.prismaService.account
      .create({ data: { ...user, verification_code: code } })
      .then(async (account) => {
        const emailResult = await this.emailService.sendConfirmationEmail(
          createAccountDto.email,
          code,
        );
        if (!emailResult)
          res.status(400).json({
            message: 'Email not sent',
            error: new Error('email not sent'),
          });
        res.status(201).json(account);
      })
      .catch((err) => {
        let message;
        if (err.code == 'P2002') {
          message = 'Account Already Exists! Enter a valid Email/Username.';
          res.status(400).json({ message: message, error: err });
        } else {
          message = 'Internal server Error!';
          res.status(500).json({ message: message, error: err });
        }
      });
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
          {
            firstname: {
              contains: search,
            },
          },
          {
            lastname: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      };
    }
    let accounts = await this.prismaService.account.findMany({
      skip: (page - 1) * counts,
      take: counts,
      where,
    });
    const count = await this.prismaService.account.count({ where });
    accounts = accounts.map((e) => {
      delete e.password;
      return e;
    });
    return { accounts, count };
  }

  findByUsername(email: string) {
    return this.prismaService.account.findFirst({
      where: {
        email: email,
      },
    });
  }

  findByEmail(email) {
    return this.prismaService.account.findUnique({ where: { email } });
  }

  findOne(id: number) {
    return this.prismaService.account.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    if (updateAccountDto.password)
      updateAccountDto.password = await bcrypt.hash(
        updateAccountDto.password,
        saltOrRounds,
      );
    return this.prismaService.account.update({
      where: { id: id },
      data: {
        ...updateAccountDto,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.account.delete({ where: { id: id } });
  }
}
