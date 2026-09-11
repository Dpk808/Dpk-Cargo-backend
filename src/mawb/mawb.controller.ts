import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { MawbService } from './mawb.service';
import { MawbPdfService } from './mawb-pdf.service';
import { CreateMawbDto } from './dto/create-mawb.dto';
import { UpdateMawbDto } from './dto/update-mawb.dto';

@Controller('mawb')
export class MawbController {
  constructor(
    private readonly mawbService: MawbService,
    private readonly mawbPdfService: MawbPdfService,
  ) {}

  // CREATE
  @Post()
  create(@Body() dto: CreateMawbDto) {
    return this.mawbService.create(dto);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.mawbService.findAll();
  }

  // GENERATE PDF
  @Get(':id/pdf')
  async generatePdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.mawbPdfService.generatePdf(id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="MAWB-${id}.pdf"`,
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  // GET ONE
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mawbService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMawbDto) {
    return this.mawbService.update(id, dto);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mawbService.remove(id);
  }
}