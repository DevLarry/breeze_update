/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsObject, IsDateString } from 'class-validator';

export class CreatePublicityDto {
  @ApiPropertyOptional({
    description: 'Targeting filters for the publicity',
    example: {
      ethnicity: ['Yoruba', 'Igbo'],
      religiousBelief: ['Islam', 'Christianity'],
      faculty: [1, 2],
      department: [3, 4],
      gender: ['male', 'female']
    }
  })
  @IsObject()
  @IsNotEmpty()
  targetFilters: {
    ethnicity?: string[];
    religiousBelief?: string[];
    faculty?: number[];
    department?: number[];
    gender?: string[];
  };

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ 
    description: 'End date for the publicity',
    example: '2024-11-31'
  })
  endDate?: Date;
}