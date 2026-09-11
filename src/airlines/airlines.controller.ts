import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
import { AirlinesService } from './airlines.service';

@ApiTags('Airlines')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('airlines')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new airline' })
  create(@Body() createAirlineDto: CreateAirlineDto) {
    return this.airlinesService.create(createAirlineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all airlines' })
  findAll() {
    return this.airlinesService.findAll();
  }

  @Get('prefix/:prefix')
  @ApiOperation({ summary: 'Find airlines by prefix' })
  findByPrefix(@Param('prefix') prefix: string) {
    return this.airlinesService.findByPrefix(prefix);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an airline by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.airlinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an airline' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAirlineDto: UpdateAirlineDto) {
    return this.airlinesService.update(id, updateAirlineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an airline' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.airlinesService.remove(id);
  }
}

