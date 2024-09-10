/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async createTags(tagNames: string[]): Promise<any> {
    try {
      const tags = await Promise.all(
        tagNames.map(async (name) => {
          return await this.prisma.tag.upsert({
            where: { name },
            update: { name },
            create: { name },
          });
        })
      );
      return tags;
    } catch (error) {
      console.error('Error creating tags:', error);
      throw new InternalServerErrorException('An error occurred while creating tags.');
    }
  }

  async findAllTags(): Promise<any[]> {
    try {
      return await this.prisma.tag.findMany();
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw new InternalServerErrorException('An error occurred while fetching tags.');
    }
  }

  async findTagsByIds(tagIds: number[]): Promise<any[]> {
    try {
      return await this.prisma.tag.findMany({
        where: { id: { in: tagIds } },
      });
    } catch (error) {
      console.error('Error fetching tags by IDs:', error);
      throw new InternalServerErrorException('An error occurred while fetching tags by IDs.');
    }
  }

  async associateTagsWithPost(postId: number, tagIds: number[]): Promise<any> {
    try {
      const postTags = await Promise.all(
        tagIds.map(async (tagId) => {
          return await this.prisma.postToTag.create({
            data: {
              postId,
              tagId,
            },
          });
        })
      );
      return postTags;
    } catch (error) {
      console.error('Error associating tags with post:', error);
      throw new InternalServerErrorException('An error occurred while associating tags with post.');
    }
  }
}
