/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { NotificationType } from '@prisma/client';

export class NotificationDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  postId?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ enum: NotificationType })
  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}