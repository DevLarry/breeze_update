/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString, IsBoolean, IsInt, IsArray } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiPropertyOptional({ description: 'The title of the post' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'The content of the post' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'An optional description of the post' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Whether the post is published' })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiPropertyOptional({ description: 'The ID of the author' })
  @IsOptional()
  @IsInt()
  authorId?: number;
  
  @ApiPropertyOptional({ description: 'The ID of the category' })
  @IsOptional()
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ description: 'List of tag IDs associated with the post' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: string;

  @ApiPropertyOptional({ description: 'List of topic IDs associated with the post' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  topics?: number[];

}
