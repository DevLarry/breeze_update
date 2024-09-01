/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto'; 
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto, files: Express.Multer.File[]) {
    const { title, content, description, published, authorId, categoryId } = createPostDto;
  
    // const images = files.length ? files.map(file => file.filename) : null;

    try {
      return await this.prisma.post.create({
        data: {title,content,description,published,
          author: {
            connect: { id: authorId },
          },
          category: {
            connect: { id: categoryId },
          },
         // images:,  
        },
      });
    } catch (e) {
      throw new Error('Error creating post');
    }
  }


  async getPost(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
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
    return await this.prisma.post.delete({ where: { id } });
  }
}
