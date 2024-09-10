/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReactionDto } from './dto/reaction.dto';
import { Express } from 'express';
import { TagService } from '../tags/tag.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService,private readonly tagService: TagService) { }

  async createPost(
    createPostDto: CreatePostDto,
    files: Express.Multer.File[],
  ): Promise<any> {
    const { title, content, description, published, authorId, categoryId, tags } = createPostDto;
    console.log('Received CreatePostDto:', createPostDto);

    const tagNames = tags.split(',').map(tag => tag.trim());
  
    try {
    
      const createdTags = await Promise.all(
        tagNames.map(async (name) => {
          return await this.prisma.tag.upsert({
            where: { name }, 
            update: {}, 
            create: { name }, 
          });
        })
      );
  
      const post = await this.prisma.post.create({
        data: {
          title,
          content,
          description,
          published: Boolean(published),
          author: { connect: { id: authorId } },
          category: { connect: { id: Number(categoryId) } },
          tags: {
            create: createdTags.map(tag => ({
              tag: { connect: { id: tag.id } },  
            })),
          },
          uploads: {
            createMany: {
              data: files.map(file => ({ fileName: file.filename })),
            },
          },
        },
        include: {
          tags: true,
          uploads: true,
        },
      });
  
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw new InternalServerErrorException('An error occurred while creating the post.');
    }
  }
  
  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<any> {
    const { tags = [], authorId, categoryId, title, content, description, published } = updatePostDto;

    const tagArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    const createdTags = tagArray.length ? await this.tagService.createTags(tagArray) : [];

    try {
      // Update the post and handle the tags
      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: {
          title,
          content,
          description,
          published,
          authorId: authorId ? authorId : undefined,
          categoryId: categoryId ? categoryId : undefined,
          tags: createdTags.length > 0 ? { set: createdTags.map((tag) => ({ id: tag.id })) } : undefined,
        },
        include: {
          uploads: true,
          author: true,
          category: true,
          tags: true,
        },
      });

      return updatedPost;
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post with ID ${id} not found.`);
      }
      throw new InternalServerErrorException('An error occurred while updating the post.');
    }
  }


  async deletePost(id: number): Promise<any> {
    try {
      const deletedPost = await this.prisma.post.delete({
        where: { id },
      });
      return deletedPost;
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      if (error.code === 'P2025') { 
        throw new NotFoundException(`Post with ID ${id} not found.`);
      }
      throw new InternalServerErrorException('An error occurred while deleting the post.');
    }
  }

  async addReaction(postId: number, reactionDto: ReactionDto, userId: number): Promise<any> {
    const { type } = reactionDto;
    try {
      const post = await this.prisma.post.findUnique({ where: { id: postId } });

      if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found.`);
      }

      const reaction = await this.prisma.reaction.upsert({
        where: { postId_userId: { postId, userId } },
        update: { type },
        create: {
          type,
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
        },
      });

      return reaction;
    } catch (error) {
      console.error(`Error adding reaction to post with ID ${postId}:`, error);
      throw new InternalServerErrorException('An error occurred while adding the reaction.');
    }
  }

  async getPost(id: number): Promise<any> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          comments: {
            orderBy: { createdAt: 'desc' },
            include: { author: true },
          },
          uploads: { select: { fileName: true } },
          tags: true, 
          topics: true,
          reactions: true, 
        },
      });

      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found.`);
      }

      return post;
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      throw new InternalServerErrorException('An error occurred while fetching the post.');
    }
  }

  async findAll(
    page: number,
    count: number,
    search: string,
  ): Promise<{
    posts: any[];
    total: number;
    currentPage: number;
    pageSize: number;
  }> {
    const skip = (page - 1) * count;
    const whereCondition = search
      ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }
      : {};

    try {
      const posts = await this.prisma.post.findMany({
        where: whereCondition,
        skip,
        take: count,
        orderBy: { createdAt: 'desc' },
        include: { uploads: true, tags: true, reactions: true }, // Include tags and reactions
      });

      const total = await this.prisma.post.count({ where: whereCondition });

      return {
        posts,
        total,
        currentPage: page,
        pageSize: count,
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new InternalServerErrorException('An error occurred while fetching the posts.');
    }
  }
}