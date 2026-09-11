// import { Controller } from '@nestjs/common';

// @Controller('consignee')
// export class ConsigneeController {}

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateConsigneeDto } from './dto/create-consignee.dto';
import { ConsigneeService } from './consignee.service';
import { UpdateConsigneeDto } from './dto/update-consignee.dto';
  
  @ApiTags('Consignee')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)  // protects all routes in this controller
  @Controller('consignee')
  export class ConsigneeController {
    constructor(private readonly consigneeService: ConsigneeService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new consignee' })
    create(@Body() createConsigneeDto: CreateConsigneeDto) {
      return this.consigneeService.create(createConsigneeDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all consignees' })
    findAll() {
      return this.consigneeService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a consignee by ID' })
    findOne(@Param('id') id: number) {
      return this.consigneeService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a consignee' })
    update(@Param('id') id: number, @Body() updateConsigneeDto: UpdateConsigneeDto) {
      return this.consigneeService.update(id, updateConsigneeDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a consignee' })
    remove(@Param('id') id: number) {
      return this.consigneeService.remove(id);
    }
  }


