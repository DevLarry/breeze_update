/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, UploadedFiles, UseInterceptors, UseGuards, Param, ParseIntPipe, Query, Req } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Express } from 'express'; 
import { ApiConsumes, ApiParam, ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a post with images' })
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
      limits: { fileSize: 5 * 1024 * 1024 }, 
    }),
  )
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any
  ) {
    createPostDto.authorId = req.user.id; 
    return this.postService.createPost(createPostDto, files);
  }

  @Get()
  @ApiOperation({ summary: 'Get a paginated list of posts with optional search' })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number' })
  @ApiQuery({ name: 'count', type: 'number', required: false, description: 'Number of posts per page' })
  @ApiQuery({ name: 'search', type: 'string', required: false, description: 'Search query for filtering posts' })
  async findAll(@Query() query) {
    const page = +query.page || 1;
    const count = +query.count || 10;
    const search = query.search || '';
    return this.postService.findAll(page, count, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID with comments and uploads' })
  @ApiParam({ name: 'id', type: 'number', description: 'Post ID' })
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Post ID' })
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Post ID' })
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}
