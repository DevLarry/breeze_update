/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class AddTopicsDto {
    @ApiProperty({ description: 'Array of topic IDs to associate with the post' })
    topicIds: number[];
}
