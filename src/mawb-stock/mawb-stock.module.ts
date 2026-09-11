import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MawbStockController } from './mawb-stock.controller';
import { MawbStockService } from './mawb-stock.service';
import { MawbStock } from './entities/mawb-stock.entity';
import { Airline } from '../airlines/entities/airline.entity';
import { Agent } from '../agent/entities/agent.entity';
import { MawbStockExpiryService } from './mawb-stock-expiry.service';

@Module({
  imports: [TypeOrmModule.forFeature([MawbStock, Airline, Agent])],
  controllers: [MawbStockController],
  providers: [MawbStockService, MawbStockExpiryService],
  exports: [MawbStockService],
})
export class MawbStockModule {}
