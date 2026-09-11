import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTaxInvoiceDto } from './create-tax-invoice.dto';
import { UpdateTaxInvoiceItemDto } from './update-tax-invoice-items.dto';

// Omit items from the base so we can redeclare it freely
export class UpdateTaxInvoiceDto extends PartialType(
  OmitType(CreateTaxInvoiceDto, ['items'] as const)
) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTaxInvoiceItemDto)
  items?: UpdateTaxInvoiceItemDto[];
}

// export class UpdateTaxInvoiceDto extends PartialType(CreateTaxInvoiceDto) {}