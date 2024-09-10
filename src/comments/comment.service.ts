/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new comment
  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.prisma.comment.create({
        data: {
          ...createCommentDto,
        },
      });
      return comment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new InternalServerErrorException('Failed to create comment');
    }
  }
  

  // Find a comment by ID
  async findOne(id: number) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found.`);
      }
      return comment;
    } catch (error) {
      throw new InternalServerErrorException('Error finding comment');
    }
  }

  // Update a comment
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const updatedComment = await this.prisma.comment.update({
        where: { id },
        data: { ...updateCommentDto },
      });
      return updatedComment;
    } catch (error) {
      if (error.code === 'P2025') { // Prisma-specific error code for record not found
        throw new NotFoundException(`Comment with ID ${id} not found.`);
      }
      throw new InternalServerErrorException('Error updating comment');
    }
  }

  // Delete a comment
  async remove(id: number) {
    try {
      const deletedComment = await this.prisma.comment.delete({
        where: { id },
        include: { childComments: true },
      });
      return deletedComment;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Comment with ID ${id} not found.`);
      }
      throw new InternalServerErrorException('Error deleting comment');
    }
  }

  // Get all comments with paginati
  async findAll(page: number, count: number) {
    try {
      const comments = await this.prisma.comment.findMany({
        skip: (page - 1) * count,
        take: count,
        orderBy: { createdAt: 'desc' },
      });
      return comments;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching comments');
    }
  }

  // Get comments by postId with page
  async findByPostId(postId: number, page: number, count: number) {
    try {
      const comments = await this.prisma.comment.findMany({
        where: { postId },
        skip: (page - 1) * count,
        take: count,
        orderBy: { createdAt: 'desc' },
      });
      return comments;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching comments for post with ID ${postId}`,
      );
    }
  }
}
