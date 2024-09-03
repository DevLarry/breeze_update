/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto, files: Express.Multer.File[]) {
    const { title, content, description, published, authorId, categoryId } =
      createPostDto;

    try {
      return this.prisma.post
        .create({
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
            // images:,
            uploads: {
              createMany: {
                data: files.map((file) => ({ fileName: file.filename })),
              },
            },
          },
        })
        .then((res) => {
          files.forEach((file) => {
            this.prisma.upload.create({
              data: {
                fileName: file.filename,
                postId: res.id,
              },
            });
          });
        });
    } catch (e) {
      throw new InternalServerErrorException('Error creating post');
    }
  }

  async getPost(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id }, include: {
      comments: {
        take: 10,
        orderBy: {
          createdAt: "desc"
        }
      }
    } });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found.`);
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async deletePost(id: number) {
    return await this.prisma.post.delete({
      where: { id },
      include: {
        uploads: true,
        comments: true,
      },
    });
  }
}
