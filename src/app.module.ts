/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { PostModule } from './post/post.module';
import { CommentModule } from './comments/comment.module';
import { TopicModule } from './topics/topic.module';
import { TagModule } from './tags/tag.module';
import { SocietyModule } from './society/society.module';
import { PublicityModule } from './publicity/publicity.module';
import { NotificationModule } from './notification/notification.module';

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
    SocietyModule,
    PublicityModule,
    TagModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
