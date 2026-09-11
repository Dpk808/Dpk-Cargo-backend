import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { CompanyBank } from './entities/bank.entity';
import { Company } from '../company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyBank, Company])],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
