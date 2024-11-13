import { PartialType } from '@nestjs/swagger';
import { CreateSocietyDto } from './create-society.dto';

export class UpdateSocietyDto extends PartialType(CreateSocietyDto) {}
