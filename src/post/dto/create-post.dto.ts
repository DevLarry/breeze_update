/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
// import { IsInt ,IsArray} from 'class-validator';
import { Express } from 'express';

export class CreatePostDto {
    // @IsString()
    // @IsNotEmpty()
    @ApiProperty()
    title: string;

    // @IsString()
    // @IsNotEmpty()
    @ApiProperty()
    content: string;

    // @IsOptional()
    // @IsString()
    @ApiProperty()
    description?: string;

    // @IsOptional()
    // @IsBoolean()
    @ApiProperty()
    published?: boolean;

    // @IsOptional()
    // @IsInt()
    @ApiProperty()
    authorId?: number;

    // @IsInt()
    // @IsNotEmpty()
    @ApiProperty()
    categoryId?: number;

    @ApiProperty()
    tags: string;
    
    @ApiProperty()
    topics: number[]

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: Express.Multer.File[];
    
}
