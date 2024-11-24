/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
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