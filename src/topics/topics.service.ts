/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTopicDto, UpdateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async create(createTopicDto: CreateTopicDto) {
    return this.prisma.topic.create({
      data: createTopicDto,
    });
  }

  async findAll() {
    return this.prisma.topic.findMany({
      include: {
        posts: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.topic.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    return this.prisma.topic.update({
      where: { id },
      data: updateTopicDto,
    });
  }

  async remove(id: number) {
    return this.prisma.topic.delete({
      where: { id },
    });
  }
}