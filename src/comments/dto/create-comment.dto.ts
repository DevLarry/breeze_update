/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'The ID of the author' })
  @IsInt()
  authorId: number;

  @ApiProperty({ description: 'The ID of the post' })
  @IsInt()
  postId: number;

  @ApiPropertyOptional({ description: 'The ID of the parent comment if it is a reply' })
  @IsOptional()
  @IsInt()
  parentId?: number;
}
