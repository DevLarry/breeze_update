/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateCommentDto {
  @ApiPropertyOptional({ description: 'The updated content of the comment' })
  @IsOptional()
  @IsNotEmpty()
  content?: string;

  @ApiPropertyOptional({ description: 'The ID of the parent comment if it is a reply' })
  @IsOptional()
  @IsInt()
  parentId?: number;
}
