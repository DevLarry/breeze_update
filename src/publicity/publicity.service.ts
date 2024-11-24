/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, Publicity, NotificationType } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { NotificationService } from 'src/notification/notification.service';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { PostService } from '../post/post.service';

@Injectable()
export class PublicityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly postService: PostService,
  ) {}

  // publicize an existing post
  async publicizeExistingPost(
    postId: number,
    publicityDto: CreatePublicityDto,
    userId: number,
  ): Promise<Publicity> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: postId },
        include: { publicity: true },
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      const hasActivePublicity = post.publicity.some((p) => p.status === 'ACTIVE');
      if (hasActivePublicity) {
        throw new BadRequestException('Post already has active publicity');
      }

      const publicityData: Prisma.PublicityCreateInput = {
        post: { connect: { id: postId } },
        amount: new Prisma.Decimal(0),
        targetFilters: publicityDto.targetFilters || {},
        endDate: publicityDto.endDate,
        status: 'ACTIVE',
      };

      const publicity = await this.prisma.publicity.create({ data: publicityData });
      await this.notifyTargetedUsers(publicity.id);

      return publicity;
    } catch (error) {
      console.error('Error publicizing existing post:', error);
      console.log(error);
      
      throw new InternalServerErrorException('Could not publicize existing post');
    }
  }

  // create a new post and publicize it
  async createAndPublicizePost(
    createPostDto: CreatePostDto,
    publicityDto: CreatePublicityDto,
    userId: number,
  ): Promise<Publicity> {
    try {
      const newPost = await this.postService.createPost(
        { ...createPostDto, authorId: userId },
        createPostDto.files || [],
      );

      return this.publicizeExistingPost(newPost.id, publicityDto, userId);
    } catch (error) {
      console.error('Error creating and publicizing post:', error);
      throw new InternalServerErrorException('Could not create and publicize post');
    }
  }
  private async notifyTargetedUsers(publicityId: number): Promise<void> {
    try {
      const publicity = await this.prisma.publicity.findUnique({
        where: { id: publicityId },
        include: { 
          post: {
            include: {
              author: true 
            }
          } 
        },
      });
  
      if (!publicity) return;
  
      await this.notificationService.createNotification(
        publicity.post.id,
        NotificationType.TARGETED_POST,
        publicity.post.author.id, 
        'Your post has been targeted for publicity' 
      );
    } catch (error) {
      console.error('Error notifying targeted users:', error);
      throw new InternalServerErrorException('Could not notify targeted users');
    }
  }
  
    private buildTargetingWhereClause(filters: Prisma.JsonObject): Prisma.AccountWhereInput {
        const whereClause: Prisma.AccountWhereInput = { AND: [] };

        if (filters.ethnicity && Array.isArray(filters.ethnicity)) {
            (whereClause.AND as Prisma.AccountWhereInput[]).push({ 
                ethnicity: { in: filters.ethnicity as string[] } 
            });
        }

        if (filters.religiousBelief && Array.isArray(filters.religiousBelief)) {
            (whereClause.AND as Prisma.AccountWhereInput[]).push({ 
                religiousBelief: { in: filters.religiousBelief as string[] } 
            });
        }

        if (filters.faculty && Array.isArray(filters.faculty)) {
            (whereClause.AND as Prisma.AccountWhereInput[]).push({ 
                department: { 
                    facultyId: { in: filters.faculty as number[] } 
                } 
            });
        }

        if (filters.department && Array.isArray(filters.department)) {
            (whereClause.AND as Prisma.AccountWhereInput[]).push({ 
                departmentId: { in: filters.department as number[] } 
            });
        }

        if (filters.gender && Array.isArray(filters.gender)) {
            (whereClause.AND as Prisma.AccountWhereInput[]).push({ 
                gender: { in: filters.gender as string[] } 
            });
        }

        return whereClause;
    }

    async getPublicityStats(publicityId: number): Promise<any> {
        try {
            const publicity = await this.prisma.publicity.findUnique({
                where: { id: publicityId },
                include: {
                    post: {
                        include: {
                            reactions: true,
                            comments: true
                        }
                    }
                }
            });

            if (!publicity) {
                throw new NotFoundException('Publicity not found');
            }

            const targetedUserCount = await this.countTargetedUsers(
                publicity.targetFilters as Prisma.JsonObject
            );

            return {
                publicityDetails: publicity,
                metrics: {
                    targetedUsers: targetedUserCount,
                    reactions: publicity.post.reactions.length,
                    comments: publicity.post.comments.length,
                }
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error getting publicity stats:', error);
            throw new InternalServerErrorException('Could not retrieve publicity stats');
        }
    }

    private async countTargetedUsers(filters: Prisma.JsonObject): Promise<number> {
        const whereClause = this.buildTargetingWhereClause(filters);
        return await this.prisma.account.count({ where: whereClause });
    }
}