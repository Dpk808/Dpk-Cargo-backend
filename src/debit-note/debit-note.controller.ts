import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DebitNoteService } from './debit-note.service';
import { CreateDebitNoteDto } from './dto/create-debit-note.dto';
import { UpdateDebitNoteDto } from './dto/update-debit-note.dto';

@ApiTags('Debit Note')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('debit-note')
export class DebitNoteController {
  constructor(private readonly debitNoteService: DebitNoteService) {}

  @Get()
  @ApiOperation({ summary: 'Get all debit notes' })
  findAll() {
    return this.debitNoteService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new debit note' })
  create(@Body() dto: CreateDebitNoteDto) {
    return this.debitNoteService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a debit note by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.debitNoteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a debit note' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDebitNoteDto) {
    return this.debitNoteService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a debit note' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.debitNoteService.remove(id);
  }
}