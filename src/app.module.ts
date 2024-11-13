/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';
import { CommentModule } from './comments/comment.module';
import { TopicModule } from './topics/topic.module';
import { TagModule } from './tags/tag.module';
import { NotificationModule } from './notification/notification.module';
import { SocietyModule } from './society/society.module';


@Module({
  imports: [
      MulterModule.register({
        dest: './uploads',
      }),
    AccountModule,
    AuthModule,
    PostModule,
    CommentModule,
    NotificationModule,
    SocietyModule
    
    ],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
