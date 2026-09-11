import {
  IsString,
  IsDateString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsInt,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTaxInvoiceItemDto } from './create-tax-invoice-items.dto';

export class CreateTaxInvoiceDto {
  @ApiProperty({ description: 'Invoice number', example: 'INV-001' })
  @IsString()
  @MaxLength(20)
  invoice_no: string;

  @ApiProperty({ description: 'Invoice date', example: '2026-01-31' })
  @IsDateString()
  date: string;

  // FK ids — shipper/consignee/agent are optional
  @ApiProperty({ description: 'Shipper ID', example: 1, required: false })
  @IsOptional()
  @IsInt()
  shipper_id?: number | null;

  @ApiProperty({ description: 'Consignee ID', example: 2, required: false })
  @IsOptional()
  @IsInt()
  consignee_id?: number | null;

  @ApiProperty({ description: 'Agent ID', example: 3, required: false })
  @IsOptional()
  @IsInt()
  agent_id?: number | null;

  @ApiProperty({ description: 'MAWB ID', example: 5 })
  @IsInt() // mawb is required
  mawb_id: number;

  @ApiProperty({ description: 'Is the invoice in USD', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_usd?: boolean; // defaults to false

  @ApiProperty({ description: 'Sub total amount', example: 100.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  sub_total: number;

  @ApiProperty({ description: 'Discount amount', example: 0.0, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  discount?: number | null;

  @ApiProperty({ description: 'Taxable amount', example: 100.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  taxable_amount: number;

  @ApiProperty({ description: 'VAT rate', example: 13, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  vat_rate?: number | null;

  @ApiProperty({ description: 'VAT amount', example: 13.0, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  vat_amount?: number | null;

  @ApiProperty({ description: 'Grand total amount', example: 113.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  grandtotal: number;

  @ApiProperty({ description: 'Amount in words', example: 'One hundred thirteen' })
  @IsString()
  @MaxLength(255)
  in_words: string;

  @ApiProperty({ description: 'Line items', type: [CreateTaxInvoiceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaxInvoiceItemDto)
  items: CreateTaxInvoiceItemDto[];
}

