import { Module } from '@nestjs/common';
import { TaxInvoiceService } from './tax-invoice.service';
import { TaxInvoiceController } from './tax-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxInvoice } from './entities/tax-invoice.entity';
import { TaxInvoiceItems } from './entities/tax-invoice-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxInvoice, TaxInvoiceItems])],
  controllers: [TaxInvoiceController],
  providers: [TaxInvoiceService],
})
export class TaxInvoiceModule {}
