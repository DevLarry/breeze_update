/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { Express } from 'express';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsInt()
    @IsNotEmpty()
    authorId: number;

    @IsInt()
    @IsNotEmpty()
    categoryId: number;

    @IsOptional()
    file?: Express.Multer.File;
}
  