import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { HawbService } from './hawb.service';
import { CreateHawbDto } from './dto/create-hawb.dto';
import { UpdateHawbDto } from './dto/update-hawb.dto';

@Controller('hawb')
export class HawbController {
  constructor(private readonly hawbService: HawbService) {}

  // CREATE
  @Post()
  create(@Body() dto: CreateHawbDto) {
    return this.hawbService.create(dto);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.hawbService.findAll();
  }

  // GET ONE
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hawbService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHawbDto) {
    return this.hawbService.update(id, dto);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hawbService.remove(id);
  }
}
