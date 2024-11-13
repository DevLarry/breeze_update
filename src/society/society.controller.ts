import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocietyService } from './society.service';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';

@Controller('society')
export class SocietyController {
  constructor(private readonly societyService: SocietyService) {}

  @Post()
  create(@Body() createSocietyDto: CreateSocietyDto) {
    return this.societyService.create(createSocietyDto);
  }

  @Get()
  findAll() {
    return this.societyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.societyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocietyDto: UpdateSocietyDto) {
    return this.societyService.update(+id, updateSocietyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.societyService.remove(+id);
  }
}
