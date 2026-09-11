import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxInvoiceItemDto } from './create-tax-invoice-items.dto';

export class UpdateTaxInvoiceItemDto extends PartialType(CreateTaxInvoiceItemDto) {}