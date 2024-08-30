import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Res,
  Session,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './DTO/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { AccountService, saltOrRounds } from 'src/account/account.service';
import { generateOtp } from 'src/account/otp.utils';
import * as bcrypt from 'bcrypt';
import { ApiQuery } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private accountService: AccountService,
  ) {}
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Session() session,
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginDTO,
  ) {
    let token = this.authService.signIn(body.username, body.password);
    session.token = (await token).access_token;
    // res.cookie("login", (await token).access_token)
    return token;
  }

  @Get('confirm-email')
  @ApiQuery({name: 'email', type: String})
  @ApiQuery({name: 'code', type: String})
  confirmEmail(@Query('code') code, @Query('email') email) {

    return this.authService.confirmEmail(email, code);
  }

  @Get('resend-confirmation-email')
  @ApiQuery({name: 'email', type: String})
  resendConfirmationEmail(@Query('email') email) {
    return this.authService.resendConfirmationEmail(email);
  }

  @Get('forgot-password')
  @ApiQuery({name: 'email', type: String})
  forgotPassword(@Query('email') email) {
    return this.authService.sendForgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body) {
    const { email, password, otp } = body;
    const res = await this.authService.confirmEmail(email, otp);
    const hash = await bcrypt.hash(password, saltOrRounds);
    if (res.status === 'success') {
      return this.accountService.update(res.account.id, { password: hash, verification_code: generateOtp() });
    }
    throw new BadRequestException("Email Coonfirmation failed!");
  }

  @Get()
  @UseGuards(LocalAuthGuard)
  verify(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // console.log(req.user);
    return req.user;
  }

  @Get('logout')
  logout(@Session() session) {
    session.destroy();
  }
}
