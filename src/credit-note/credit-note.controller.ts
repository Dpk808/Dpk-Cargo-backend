import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreditNoteService } from './credit-note.service';
import { CreateCreditNoteDto } from './dto/create-credit-note.dto';
import { UpdateCreditNoteDto } from './dto/update-credit-note.dto';

@ApiTags('Credit Note')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('credit-note')
export class CreditNoteController {
  constructor(private readonly creditNoteService: CreditNoteService) {}

  @Get()
  @ApiOperation({ summary: 'Get all credit notes' })
  findAll() {
    return this.creditNoteService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new credit note' })
  create(@Body() dto: CreateCreditNoteDto) {
    return this.creditNoteService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a credit note by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.creditNoteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a credit note' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCreditNoteDto) {
    return this.creditNoteService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a credit note' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.creditNoteService.remove(id);
  }
}


