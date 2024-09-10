/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async create(createTopicDto: CreateTopicDto) {
    const { name } = createTopicDto;
    try {
      return await this.prisma.topic.create({ data: { name } });
    } catch (error) {
      throw new BadRequestException('Could not create topic');
    }
  }

  async findAll() {
    return await this.prisma.topic.findMany();
  }

  async findOne(id: number) {
    const topic = await this.prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new NotFoundException('Topic not found');
    return topic;
  }

  async updateTopicsForPost(postId: number, topicIds: number[]) {
    try {
      return await this.prisma.post.update({
        where: { id: postId },
        data: { topics: { set: topicIds.map((id) => ({ id })) } },
        include: { topics: true },
      });
    } catch (error) {
      throw new BadRequestException('Error associating topics to the post');
    }
  }
}
