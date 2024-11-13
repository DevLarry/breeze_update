/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Account as account } from '@prisma/client';
export type Role = $Enums.Role;
export class Account implements account {
  @ApiProperty()
  id: number;
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
  verification_code: string;
  @ApiProperty()
  is_verified: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  departmentId: number;
}
