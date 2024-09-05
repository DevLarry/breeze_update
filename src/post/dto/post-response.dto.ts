/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty({ isArray: true, type: String })
  uploads: string[];

  @ApiProperty({ isArray: true, type: Object })
  comments: { id: number; content: string; authorId: number; createdAt: Date }[];
}
