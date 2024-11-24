/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Express } from 'express';
import { Role } from '@prisma/client';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  published?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  authorId?: number;

  @IsNumber()
  @ApiProperty()
  categoryId: number;

  @IsString()
  @ApiProperty()
  tags: string;


  @IsString()
  @ApiProperty()
  topics: string;



  // @ApiPropertyOptional()
  // @IsOptional()
  // @IsNumber()
  // departmentId?: number;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @IsNumber()
  // facultyId?: number;



  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary'
    }
  })
  files?: Express.Multer.File[];

  uploads?: any;
}