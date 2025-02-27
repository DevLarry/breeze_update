/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PublicityService } from './publicity.service';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('publicity')
@Controller('api/publicity')
export class PublicityController {
  constructor(private readonly publicityService: PublicityService) {}

  @Post(':postId/publicize')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Publicize an existing post',
    description: 'Create publicity for an existing post by providing its ID and targeting criteria',
  })
  @ApiBody({ type: CreatePublicityDto })
  @ApiResponse({ 
    status: 201, 
    description: 'The post has been successfully publicized',
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Post already has active publicity',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Post not found',
  })
  async publicizeExistingPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() publicityDto: CreatePublicityDto,
    @Request() req,
  ) {
    return this.publicityService.publicizeExistingPost(postId, publicityDto, req.user.id);
  }

  @Get(':publicityId/stats')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get publicity statistics',
    description: 'Get detailed statistics for a publicity campaign',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the publicity statistics',
  })
  async getPublicityStats(
    @Param('publicityId', ParseIntPipe) publicityId: number
  ) {
    return this.publicityService.getPublicityStats(publicityId);
  }
}