import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import e from 'express';
import { MailerService } from 'src/email.service';
import { generateOtp } from 'src/account/otp.utils';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
const saltOrRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private AccountService: AccountService,
    private jwtService: JwtService,
    private emailService: MailerService,
  ) {}

  
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.AccountService.findByEmail(email);
    
    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }
  
    if (await bcrypt.compare(pass, user.password)) {
      if (user.is_verified) {
        const { password, verification_code, verification_token, ...result } = user;
        const payload = { 
          sub: user.id,
          email: user.email,
          role: user.role || 'user'
        };
        
        return { 
          access_token: this.jwtService.sign(payload),
          user: result
        };
      } else {
        throw new ForbiddenException('Account not verified! Please verify your email.');
      }
    }
    
    throw new ForbiddenException('Invalid email or password');
  }

  async confirmEmail(email: string, code: string) {
    console.log('ConfirmEmail called with:', { email, code }); 
  
    const account = await this.AccountService.findByEmail(email);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
  
    if (account.verification_code !== code) {
      throw new BadRequestException('Invalid verification code');
    }
  
    if (account.is_verified) {
      return { status: 'success', message: 'Account already verified', account };
    }
  
    await this.prismaService.account.update({
      where: { email },
      data: { is_verified: true, verification_code: null, verification_token: null },
    });
  
    return { status: 'success', message: 'Account verified successfully', account };
  }

  async sendForgotPassword(email: string) {
    const account = await this.AccountService.findByEmail(email);
    const otp = generateOtp();
    if (!account) throw new NotFoundException('User does not exist!');
    try {
      const res = this.AccountService.update(account.id, {
        verification_code: otp,
      });
      return this.emailService.sendForgotPasswordEmail(email, otp);
    } catch (err) {
      throw new BadRequestException('An unknown error Occured!');
    }
  }

  async resendConfirmationEmail(email: string) {
    const account = await this.AccountService.findByEmail(email);
    if (!account) throw new NotFoundException('User does not exist!');
    const code = generateOtp();
    const verificationToken = require('uuid').v4();
    await this.prismaService.account.update({
      where: { email },
      data: { verification_code: code, verification_token: verificationToken },
    });
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;
    return this.emailService.sendConfirmationEmail(email, code, verificationLink);
  }



  async resetPassword(email: string, code: string, newPassword: string) {
    const account = await this.AccountService.findByEmail(email);
    if (!account) {
      throw new NotFoundException('User does not exist');
    }
  
    if (account.verification_code !== code) {
      throw new BadRequestException('Invalid verification code');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
    await this.prismaService.account.update({
      where: { email },
      data: { password: hashedPassword, verification_code: null, verification_token: null },
    });
  
    return { status: 'success', message: 'Password reset successfully' };
  }
}