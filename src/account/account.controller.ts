import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiBody
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('accounts') // Tags to categorize the endpoints
@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService,private readonly authService:AuthService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new account',
    description: 'Creates a new account with the provided details and sends a confirmation email.',
  })
  @ApiResponse({ status: 201, description: 'Account created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createAccountDto: CreateAccountDto) {
    const account = await this.accountService.create(createAccountDto);
    return account;
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of accounts',
    description: 'Fetches a paginated list of accounts, with optional search filtering.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'count',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term for filtering accounts',
  })
  @ApiResponse({
    status: 200,
    description: 'List of accounts retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  findAll(@Query() query) {
    const page = +query.page || 1;
    const count = +query.count || 10;
    const search = query.search || '';
    return this.accountService.findAll(page, count, search);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Retrieve the current authenticated user's account",
    description: 'Fetches the account details of the currently authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Account details retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findMe(@Req() req) {
    return this.accountService.findOne(req.user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve an account by its ID',
    description: 'Fetches the account details for the specified account ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Account details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update an account by its ID',
    description: 'Updates the account details for the specified account ID.',
  })
  @ApiResponse({ status: 200, description: 'Account updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete an account by its ID',
    description: 'Deletes the account for the specified account ID.',
  })
  @ApiResponse({ status: 200, description: 'Account deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }

@Post('reset-password')
@ApiOperation({ summary: 'Reset user password using email, password, and OTP' })
@ApiResponse({ status: 200, description: 'Password reset successfully.' })
@ApiResponse({ status: 400, description: 'Invalid code or bad request.' })
@ApiBody({
  description: 'Payload for resetting the password',
  schema: {
    type: 'object',
    properties: {
      email: { type: 'string', example: 'user@example.com' },
      password: { type: 'string', example: 'securePassword123' },
      otp: { type: 'string', example: '123456' },
    },
    required: ['email', 'password', 'otp'],
  },
})
async resetPassword(@Body() body: { email: string; password: string; otp: string }) {
  return this.authService.resetPassword(body.email, body.otp, body.password);
}
}