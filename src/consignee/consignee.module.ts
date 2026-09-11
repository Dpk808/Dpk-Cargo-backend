import { Module } from '@nestjs/common';
import { ConsigneeService } from './consignee.service';
import { ConsigneeController } from './consignee.controller';
import { Consignee } from './entities/consignee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Consignee])],
  providers: [ConsigneeService],
  controllers: [ConsigneeController]
})
export class ConsigneeModule {}
