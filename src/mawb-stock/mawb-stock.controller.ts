import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MawbStockService } from './mawb-stock.service';
import { CreateMawbStockRangeDto } from './dto/create-mawb-stock-range.dto';
import { LockMawbStockDto } from './dto/lock-mawb-stock.dto';
import { StartMawbStockDto } from './dto/start-mawb-stock.dto';

@ApiTags('MAWB Stock')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('mawb-stock')
export class MawbStockController {
  constructor(private readonly mawbStockService: MawbStockService) {}

  @Post('range')
  @ApiOperation({ summary: 'Create MAWB serial ranges' })
  createRange(@Body() dto: CreateMawbStockRangeDto) {
    return this.mawbStockService.createRange(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get MAWB stock (optionally filtered by airline)' })
  findAll(@Query('airlineId') airlineId?: string) {
    return this.mawbStockService.findAll(airlineId ? Number(airlineId) : undefined);
  }

  @Get('available')
  @ApiOperation({ summary: 'Get earliest available MAWB stock for an airline prefix' })
  findAvailableByPrefix(@Query('airline_prefix') airline_prefix: string) {
    return this.mawbStockService.findAvailableByPrefix(airline_prefix);
  }

  @Patch(':id/hold')
  @ApiOperation({ summary: 'Hold a MAWB serial' })
  hold(@Param('id', ParseIntPipe) id: number, @Body() dto: LockMawbStockDto) {
    return this.mawbStockService.hold(id, dto);
  }

  @Patch(':id/release')
  @ApiOperation({ summary: 'Release a held MAWB serial' })
  release(@Param('id', ParseIntPipe) id: number) {
    return this.mawbStockService.release(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a MAWB stock entry' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mawbStockService.remove(id);
  }

  // @Patch(':id/start')
  // @ApiOperation({ summary: 'Mark MAWB stock as started' })
  // start(@Param('id', ParseIntPipe) id: number) {
  //   return this.mawbStockService.markAsStarted(id);
  // }
}

