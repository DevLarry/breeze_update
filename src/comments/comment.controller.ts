/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('comments')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Comment ID' })
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Comment ID' })
  @ApiBody({ type: UpdateCommentDto })
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Comment ID' })
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get a paginated list of comments' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number' })
  @ApiQuery({ name: 'count', type: 'number', required: false, description: 'Number of comments per page' })
  findAll(@Query('page') page: number = 1, @Query('count') count: number = 10) {
    return this.commentService.findAll(page, count);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get comments by post ID' })
  @ApiParam({ name: 'postId', type: 'number', description: 'Post ID' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number' })
  @ApiQuery({ name: 'count', type: 'number', required: false, description: 'Number of comments per page' })
  findByPostId(@Param('postId') postId: number, @Query('page') page: number = 1, @Query('count') count: number = 10) {
    return this.commentService.findByPostId(postId, page, count);
  }
}
