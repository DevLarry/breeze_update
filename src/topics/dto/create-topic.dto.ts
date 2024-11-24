/* eslint-disable prettier/prettier */
// topic.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;
}

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;
}