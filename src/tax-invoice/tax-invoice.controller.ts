
import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaxInvoiceService } from './tax-invoice.service';
import { CreateTaxInvoiceDto } from './dto/create-tax-invoice.dto';
import { UpdateTaxInvoiceDto } from './dto/update-tax-invoice.dto';

@ApiTags('Tax Invoice')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tax-invoice')
export class TaxInvoiceController {
  constructor(private readonly taxInvoiceService: TaxInvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tax invoice' })
  create(@Body() dto: CreateTaxInvoiceDto) {
    return this.taxInvoiceService.create(dto);
  }

  // Scoped to a mawb — GET /tax-invoice/mawb/5
  @Get('mawb/:mawbId')
  @ApiOperation({ summary: 'Get tax invoices for a MAWB' })
  findByMawb(@Param('mawbId', ParseIntPipe) mawbId: number) {
    return this.taxInvoiceService.findByMawb(mawbId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tax invoice by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taxInvoiceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tax invoice' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaxInvoiceDto) {
    return this.taxInvoiceService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tax invoice' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taxInvoiceService.remove(id);
  }
}