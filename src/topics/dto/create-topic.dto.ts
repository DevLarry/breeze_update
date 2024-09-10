/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
    
    @ApiProperty({ description: 'Name of the topic' })
    name: string;
}
