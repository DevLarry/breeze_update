/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { $Enums, Account } from '@prisma/client'
export class CreateAccountDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    role: $Enums.Role;
    @ApiProperty()
    bio: string;
    @ApiProperty()
    avatar: string;
    @ApiProperty()
    departmentId: number;
}
