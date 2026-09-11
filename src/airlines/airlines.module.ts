import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlinesController } from './airlines.controller';
import { AirlinesService } from './airlines.service';
import { Airline } from './entities/airline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Airline])],
  controllers: [AirlinesController],
  providers: [AirlinesService],
})
export class AirlinesModule {}
