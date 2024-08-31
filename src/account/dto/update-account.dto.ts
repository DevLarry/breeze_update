/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
    verification_code?: string;
    is_verified?: boolean;
}
