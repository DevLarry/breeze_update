/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('tags')
@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create or update tags' })
  @ApiBody({ schema: { example: { tags: ['tag1', 'tag2'] } } })
  async createTags(@Body() body: { tags: string[] }) {
    const { tags } = body;
    try {
      return await this.tagService.createTags(tags);
    } catch (error) {
      console.error('Error creating tags:', error);
      throw new InternalServerErrorException('Failed to create tags');
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  async findAllTags() {
    try {
      return await this.tagService.findAllTags();
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw new InternalServerErrorException('Failed to fetch tags');
    }
  }

  @UseGuards(AuthGuard)
  @Patch('post/:postId')
  @ApiOperation({ summary: 'Associate tags with a post' })
  @ApiBody({ schema: { example: { tagIds: [1, 2] } } })
  async associateTagsWithPost(
    @Param('postId') postId: number,
    @Body() body: { tagIds: number[] }
  ) {
    const { tagIds } = body;
    try {
      return await this.tagService.associateTagsWithPost(+postId, tagIds);
    } catch (error) {
      console.error('Error associating tags with post:', error);
      throw new InternalServerErrorException('Failed to associate tags with post');
    }
  }
}