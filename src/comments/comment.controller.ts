/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('comments')
@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return await this.commentService.create(createCommentDto);
    } catch (error) {
      throw new BadRequestException('Failed to create comment');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Comment ID' })
  async findOne(@Param('id') id: number) {
    try {
      const comment = await this.commentService.findOne(id);
      if (!comment) throw new NotFoundException(`Comment with ID ${id} not found`);
      return comment;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Comment ID' })
  @ApiBody({ type: UpdateCommentDto })
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    try {
      return await this.commentService.update(id, updateCommentDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Comment ID' })
  async remove(@Param('id') id: number) {
    try {
      return await this.commentService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get a paginated list of comments' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number' })
  @ApiQuery({ name: 'count', type: 'number', required: false, description: 'Number of comments per page' })
  async findAll(@Query('page') page: number = 1, @Query('count') count: number = 10) {
    try {
      return await this.commentService.findAll(page, count);
    } catch (error) {
      throw new BadRequestException('Error fetching comments');
    }
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get comments by post ID' })
  @ApiParam({ name: 'postId', type: 'number', description: 'Post ID' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number' })
  @ApiQuery({ name: 'count', type: 'number', required: false, description: 'Number of comments per page' })
  async findByPostId(
    @Param('postId') postId: number,
    @Query('page') page: number = 1,
    @Query('count') count: number = 10,
  ) {
    try {
      return await this.commentService.findByPostId(postId, page, count);
    } catch (error) {
      throw new BadRequestException(`Error fetching comments for post with ID ${postId}`);
    }
  }
}
