/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
      MulterModule.register({
        dest: './uploads',
      }),
    AccountModule,
    AuthModule,
    PostModule
    
    ],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
