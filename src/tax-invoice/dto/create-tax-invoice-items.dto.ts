import {
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  IsPositive,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaxInvoiceItemDto {
  @ApiProperty({ description: 'Serial number of the item', example: 1 })
  @IsInt()
  @IsPositive()
  s_no: number;

  @ApiProperty({ description: 'HS code', example: '0101', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  hs_code?: string | null;

  @ApiProperty({ description: 'Particulars/description', example: 'Freight charges' })
  @IsString()
  @MaxLength(255)
  particulars: string;

  @ApiProperty({ description: 'Quantity', example: 2, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number | null;

  @ApiProperty({ description: 'Rate per unit', example: 50.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  rate: number;

  @ApiProperty({ description: 'Amount', example: 100.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;
}

