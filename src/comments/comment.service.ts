/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
      },
    });
  }

  // Find a comment by ID
  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment)
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    return comment;
  }

  // Update a comment
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: { ...updateCommentDto },
    });
  }

  // Delete a comment
  async remove(id: number) {
    return this.prisma.comment.delete({ where: { id }, include: {
      childComments: true
    } });
  }

  // Get all comments with pagination
  async findAll(page: number, count: number) {
    return this.prisma.comment.findMany({
      skip: (page - 1) * count,
      take: count,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get comments by postId with pagination
  async findByPostId(postId: number, page: number, count: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      skip: (page - 1) * count,
      take: count,
      orderBy: { createdAt: 'desc' },
    });
  }
}
