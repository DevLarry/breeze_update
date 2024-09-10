/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Param,
  ParseIntPipe,
  Query,
  Req,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReactionDto } from './dto/reaction.dto';
import { Express } from 'express';
import {
  ApiConsumes,
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('posts')
@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a post with images and tags' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePostDto })
  @UseInterceptors(
    FilesInterceptor('files', 4, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    }),
  )
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
  ) {
    try {
      createPostDto.authorId = req.user.id;
      return await this.postService.createPost(createPostDto, files);
    } catch (error) {
      console.error('Error creating post:', error);
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get a paginated list of posts with optional search, tags, and reactions',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'count',
    type: 'number',
    required: false,
    description: 'Number of posts per page',
  })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    description: 'Search query for filtering posts',
  })
  async findAll(@Query() query) {
    try {
      const page = +query.page || 1;
      const count = +query.count || 10;
      const search = query.search || '';
      return await this.postService.findAll(page, count, search);
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new InternalServerErrorException('Failed to fetch posts');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single post by ID including tags, comments, uploads, and reactions',
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Post ID' })
  async getPost(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.postService.getPost(id);
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to fetch post');
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a post by ID with new tags' })
  @ApiParam({ name: 'id', type: 'number', description: 'Post ID' })
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      return await this.postService.updatePost(id, updatePostDto);
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to update post');
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Post ID' })
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.postService.deletePost(id);
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete post');
    }
  }

  @UseGuards(AuthGuard)
  @Post(':id/reactions')
  @ApiOperation({ summary: 'Add or update a reaction to a post' })
  @ApiParam({ name: 'id', type: 'number', description: 'Post ID' })
  @ApiBody({ type: ReactionDto })
  async addReaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() reactionDto: ReactionDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    try {
      return await this.postService.addReaction(id, reactionDto, userId);
    } catch (error) {
      console.error(`Error adding reaction to post with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to add reaction');
    }
  }
}
