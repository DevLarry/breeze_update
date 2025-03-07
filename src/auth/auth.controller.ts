// src/auth/auth.controller.ts
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
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './DTO/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { AccountService, saltOrRounds } from 'src/account/account.service';
import { generateOtp } from 'src/account/otp.utils';
import * as bcrypt from 'bcryptjs';
import { ApiQuery, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private accountService: AccountService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login and receive an access token' })
  @ApiBody({
    description: 'Login credentials',
    type: LoginDTO,
  })
  @ApiResponse({ status: 200, description: 'Successfully logged in and token issued.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(
    @Session() session,
    @Res({ passthrough: true }) res: Response,
    @Body() body: { email: string; password: string },
  ) {
    try {
      const token = await this.authService.signIn(body.email, body.password);
      session.token = token.access_token;
      return token;
    } catch (error) {
      throw error;
    }
  }
  


  @Post('confirm-email')
  @ApiOperation({ summary: 'Confirm user email with a verification code' })
  @ApiBody({
    description: 'Payload for email confirmation',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        code: { type: 'string', example: '123456' },
      },
      required: ['email', 'code'],
    },
  })
  @ApiResponse({ status: 200, description: 'Email confirmed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request or invalid code.' })
  confirmEmail(@Body() body: { email: string; code: string }) {
    console.log('Received in controller:', body);
    return this.authService.confirmEmail(body.email, body.code);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify user email via a link' })
  @ApiQuery({ name: 'token', type: String, description: 'Verification token' })
  @ApiResponse({ status: 200, description: 'Email verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token.' })
  async verifyLink(@Query('token') token: string) {
    if (!token) {
      return { status: 'error', message: 'Verification token is required' };
    }
    try {
      const result = await this.accountService.verifyByToken(token);
      return { status: 'success', ...result };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Post('resend-confirmation-email')
  @ApiOperation({ summary: 'Resend confirmation email' })
  @ApiBody({
    description: 'Email to resend confirmation email',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  @ApiResponse({ status: 200, description: 'Confirmation email resent successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  resendConfirmationEmail(@Body() body: { email: string }) {
    return this.authService.resendConfirmationEmail(body.email);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send a password reset link to the user' })
  @ApiBody({
    description: 'Email to send password reset link',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  @ApiResponse({ status: 200, description: 'Password reset link sent successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  forgotPassword(@Body() body: { email: string }) {
    return this.authService.sendForgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password using email, code, and new password' })
  @ApiBody({
    description: 'Payload for resetting the password',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        otp: { type: 'string', example: '123456' },
        password: { type: 'string', example: 'newPassword123' },
      },
    },
  })
  async resetPassword(@Body() body: { email: string; otp: string; password: string }) {
    return this.authService.resetPassword(body.email, body.otp, body.password);
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

  // @Get('logout')
  // @ApiOperation({ summary: 'Logout the user and destroy session' })
  // @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  // @ApiResponse({ status: 400, description: 'Bad request.' })
  // logout(@Session() session) {
  //   session.destroy();
  //   return {
  //     success: true,
  //   };
  // }

  @Post('check-verification')
  @ApiOperation({ summary: 'Check if an account is verified by email' })
  @ApiBody({
    description: 'Email to check verification status',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  @ApiResponse({ status: 200, description: 'Verification status returned.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  async checkVerification(@Body() body: { email: string }) {
    const account = await this.accountService.findByEmail(body.email);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return { isVerified: account.is_verified };
  }
}