/* eslint-disable prettier/prettier */
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
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@ApiTags('accounts') // Tags to categorize the endpoints
@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({ status: 201, description: 'Account created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createAccountDto: CreateAccountDto, @Response() res) {
    this.accountService.create(createAccountDto, res);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of accounts' })
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
  @ApiOperation({ summary: 'Retrieve an account by its ID' })
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
  @ApiOperation({ summary: 'Update an account by its ID' })
  @ApiResponse({ status: 200, description: 'Account updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an account by its ID' })
  @ApiResponse({ status: 200, description: 'Account deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
