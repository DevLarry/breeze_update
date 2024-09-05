/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { Express } from 'express';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

 
  async createPost(createPostDto: CreatePostDto, files: Express.Multer.File[]): Promise<PostResponseDto> {
    const { title, content, description, published, authorId, categoryId } = createPostDto;

    try {
      const post = await this.prisma.post.create({
        data: {
          title,
          content,
          description,
          published,
          author: {
            connect: { id: authorId },
          },
          category: {
            connect: { id: categoryId },
          },
          uploads: {
            createMany: {
              data: files.map((file) => ({ fileName: file.filename })),
            },
          },
        },
        include: {
          uploads: true,
          author: true,
          category: true,
        },
      });

      return this.mapPostToDto(post);
    } catch (e) {
      throw new InternalServerErrorException('Error creating post');
    }
  }

  // Get post by ID with comments and uploads included
  async getPost(id: number): Promise<PostResponseDto> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: true,
          },
        },
        uploads: true,
      },
    });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found.`);
    return this.mapPostToDto(post);
  }


  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<PostResponseDto> {
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      include: {
        uploads: true,
        author: true,
        category: true,
      },
    });
    return this.mapPostToDto(updatedPost);
  }

  
  async deletePost(id: number): Promise<PostResponseDto> {
    const deletedPost = await this.prisma.post.delete({
      where: { id },
      include: {
        uploads: true,
        comments: true,
      },
    });
    return this.mapPostToDto(deletedPost);
  }


  async findAll(page: number, count: number, search: string): Promise<{ posts: PostResponseDto[]; total: number; currentPage: number; pageSize: number }> {
    const skip = (page - 1) * count;
    const whereCondition = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const posts = await this.prisma.post.findMany({
      where: whereCondition,
      skip,
      take: count,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        uploads: true,
      },
    });

    const total = await this.prisma.post.count({ where: whereCondition });

    return {
      posts: posts.map(post => this.mapPostToDto(post)),
      total,
      currentPage: page,
      pageSize: count,
    };
  }


  private mapPostToDto(post: any): PostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      description: post.description,
      published: post.published,
      authorId: post.authorId,
      categoryId: post.categoryId,
      uploads: post.uploads.map((upload) => upload.fileName),
      comments: post.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        authorId: comment.authorId,
        createdAt: comment.createdAt,
      })),
    };
  }
}
