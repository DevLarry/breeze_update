/* eslint-disable prettier/prettier */
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
//import { AdminGuard } from './guards/admin.guard';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { AccountService, saltOrRounds } from 'src/account/account.service';
import { generateOtp } from 'src/account/otp.utils';
import * as bcrypt from 'bcryptjs';
import { ApiQuery, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';

@ApiTags('auth') // Tag for grouping the endpoints
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private accountService: AccountService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login and receive an access token' })
  @ApiResponse({ status: 200, description: 'Successfully logged in and token issued.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(
    @Session() session,
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginDTO,
  ) {
    const token = this.authService.signIn(body.username, body.password);
    session.token = (await token).access_token;
    return token;
  }

  @Get('confirm-email')
  @ApiOperation({ summary: 'Confirm user email with a verification code' })
  @ApiQuery({ name: 'email', type: String, description: 'User email address' })
  @ApiQuery({ name: 'code', type: String, description: 'Verification code' })
  @ApiResponse({ status: 200, description: 'Email confirmed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request or invalid code.' })
  confirmEmail(@Query('code') code: string, @Query('email') email: string) {
    return this.authService.confirmEmail(email, code);
  }

  @Get('resend-confirmation-email')
  @ApiOperation({ summary: 'Resend confirmation email' })
  @ApiQuery({ name: 'email', type: String, description: 'User email address' })
  @ApiResponse({ status: 200, description: 'Confirmation email resent successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  resendConfirmationEmail(@Query('email') email: string) {
    return this.authService.resendConfirmationEmail(email);
  }

  @Get('forgot-password')
  @ApiOperation({ summary: 'Send a password reset link to the user' })
  @ApiQuery({ name: 'email', type: String, description: 'User email address' })
  @ApiResponse({ status: 200, description: 'Password reset link sent successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  forgotPassword(@Query('email') email: string) {
    return this.authService.sendForgotPassword(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password using email, password, and OTP' })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 400, description: 'Email confirmation failed or bad request.' })
  async resetPassword(@Body() body: { email: string; password: string; otp: string }) {
    const { email, password, otp } = body;
    const res = await this.authService.confirmEmail(email, otp);
    const hash = await bcrypt.hash(password, saltOrRounds);
    if (res.status === 'success') {
      return this.accountService.update(res.account.id, { password: hash, verification_code: generateOtp() });
    }
    throw new BadRequestException("Email Confirmation failed!");
  }

  @Get()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Verify user credentials' })
  @ApiResponse({ status: 200, description: 'User verified successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  verify(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile information of the authenticated user' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully.', type: Account })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout the user and destroy session' })
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  logout(@Session() session) {
    session.destroy();
    return {
      success: true
    }
  }
}
