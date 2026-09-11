import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HawbService } from './hawb.service';
import { HawbController } from './hawb.controller';
import { Hawb } from './entities/hawb.entity';
import { HawbAirport } from './entities/hawb_airport.entity';
import { HawbAccounting } from './entities/hawb_accounting.entity';
import { HawbBilling } from './entities/hawb_billing.entity';
import { HawbDimension } from './entities/hawb_dimension.entity';
import { HawbOtherCharge } from './entities/hawb_other_charge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hawb,
      HawbAirport,
      HawbAccounting,
      HawbBilling,
      HawbDimension,
      HawbOtherCharge,
    ]),
  ],
  controllers: [HawbController],
  providers: [HawbService],
})
export class HawbModule {}
