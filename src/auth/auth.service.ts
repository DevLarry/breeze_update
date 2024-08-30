import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import e from 'express';
import { MailerService } from 'src/email.service';
import { generateOtp } from 'src/account/otp.utils';

@Injectable()
export class AuthService {
  constructor(
    private AccountService: AccountService,
    private jwtService: JwtService,
    private emailService: MailerService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.AccountService.findByEmail(email);

    if (user && compareSync(pass, user.password)) {
      const { password, ...result } = user;
      const payload = { username: user.email, sub: user.id };
      if (result.is_verified)
        return {
          access_token: this.jwtService.sign(payload),
        };
      else
        throw new ForbiddenException(
          'Account not verified! Click forgot password to verify email!',
        );
      // return result;
    }
    throw new ForbiddenException('Invalid username or password');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async confirmEmail(email: string, code: string) {
    const account = await this.AccountService.findByEmail(email);
    if (!account) throw new NotFoundException('User does not exist!');
    if (account.verification_code === code) {
      this.AccountService.update(account.id, {
        is_verified: account.verification_code === code,
        verification_code: generateOtp(),
      });
      return { status: 'success', account: { ...account, is_verified: true } };
    }
    throw new BadRequestException(
      account.is_verified
        ? 'Account already verified!'
        : 'Invalid verification code!',
    );
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
    return this.emailService.sendConfirmationEmail(
      email,
      account.verification_code,
    );
  }
}
