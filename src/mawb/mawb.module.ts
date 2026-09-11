import { Module } from '@nestjs/common';
import { MawbService } from './mawb.service';
import { MawbPdfService } from './mawb-pdf.service';
import { MawbController } from './mawb.controller';
import { Mawb } from './entities/mawb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Mawb])],
  controllers: [MawbController],
  providers: [MawbService, MawbPdfService],
})
export class MawbModule {}

