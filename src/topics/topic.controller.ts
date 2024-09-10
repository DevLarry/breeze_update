/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Patch,UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TopicService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { AddTopicsDto } from './dto/add-topic.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Topics')
@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new topic' })
  @ApiResponse({ status: 201, description: 'The topic has been created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTopic(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all topics' })
  @ApiResponse({ status: 200, description: 'List of all topics.' })
  async findAllTopics() {
    return this.topicService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific topic by ID' })
  @ApiResponse({ status: 200, description: 'The topic found.' })
  @ApiResponse({ status: 404, description: 'Topic not found.' })
  async findOneTopic(@Param('id') id: number) {
    return this.topicService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('post/:postId')
  @ApiOperation({ summary: 'Associate topics with a post' })
  @ApiResponse({ status: 200, description: 'Topics associated with the post.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async addTopicsToPost(
    @Param('postId') postId: number,
    @Body() addTopicsDto: AddTopicsDto,
  ) {
    return this.topicService.updateTopicsForPost(+postId, addTopicsDto.topicIds);
  }
}
