// shippers/shippers.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
  import { CreateShipperDto } from './dto/create-shipper.dto';
  import { UpdateShipperDto } from './dto/update-shipper.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ShipperService } from './shipper.service';
  
  @ApiTags('Shipper')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)  // protects all routes in this controller
  @Controller('shipper')
  export class ShipperController {
    constructor(private readonly shippersService: ShipperService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new shipper' })
    create(@Body() createShipperDto: CreateShipperDto) {
      return this.shippersService.create(createShipperDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all shippers' })
    findAll() {
      return this.shippersService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a shipper by ID' })
    findOne(@Param('id') id: number) {
      return this.shippersService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a shipper' })
    update(@Param('id') id: number, @Body() updateShipperDto: UpdateShipperDto) {
      return this.shippersService.update(id, updateShipperDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a shipper' })
    remove(@Param('id') id: number) {
      return this.shippersService.remove(id);
    }
  }