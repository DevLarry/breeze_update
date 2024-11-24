/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MailerService } from '../email.service';
import { Account, Role, NotificationType } from '@prisma/client';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService
  ) {}
// Create notifications for each user
async createNotification(
  postId: number,
  type: NotificationType,
  userId: number, 
  message?: string 
): Promise<void> {
  try {
    await this.prisma.notification.create({
      data: {
        postId,
        userId,
        type,
        message: message ?? null,
        isRead: false
      }
    });
  } catch (error) {
    this.logger.error(`Failed to create notification for post ${postId}`, error.stack);
  }
}

  private async sendEmailNotifications(users: Account[], postId: number): Promise<void> {
    try {
      const post = await this.prisma.post.findUnique({ 
        where: { id: postId },
        include: { author: true }
      });
  
      if (!post) {
        this.logger.warn(`Post ${postId} not found for notification`);
        return;
      }
  
      await Promise.allSettled(
        users.map(async (user) => {
          try {
            await this.mailerService.sendEmail(
              user.email, 
              'New Post Notification', 
              this.createEmailTemplate(post)
            );
          } catch (emailError) {
            this.logger.error(`Failed to send email to ${user.email}`, emailError.stack);
          }
        })
      );
    } catch (error) {
      this.logger.error(`Error in sendEmailNotifications for post ${postId}`, error.stack);
    }
  }

  private createEmailTemplate(post: any): string {
    return `
      <html>
        <body>
          <h1>New Post Notification</h1>
          <p>A new post "${post.title}" has been created by ${post.author.name}</p>
          <a href="${process.env.FRONTEND_URL}/posts/${post.id}">View Post</a>
        </body>
      </html>
    `;
  }

  async getUserNotifications(userId: number) {
    try {
      return await this.prisma.notification.findMany({
        where: { userId },
        include: { 
          post: {
            select: { 
              id: true, 
              title: true, 
              author: { 
                select: { name: true } 
              } 
            } 
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      this.logger.error(`Failed to fetch notifications for user ${userId}`, error.stack);
      return [];
    }
  }

  async markNotificationAsRead(notificationId: number, userId: number) {
    try {
      return await this.prisma.notification.updateMany({
        where: { 
          id: notificationId, 
          userId: userId 
        },
        data: { isRead: true }
      });
    } catch (error) {
      this.logger.error(`Failed to mark notification ${notificationId} as read`, error.stack);
      throw error;
    }
  }

  async deleteNotification(notificationId: number, userId: number) {
    try {
      return await this.prisma.notification.deleteMany({
        where: { 
          id: notificationId, 
          userId: userId 
        }
      });
    } catch (error) {
      this.logger.error(`Failed to delete notification ${notificationId}`, error.stack);
      throw error;
    }
  }
}