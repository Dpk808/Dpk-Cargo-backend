import { IsNumber, IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBillingDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  weight_charge: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  valuation_charge?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  tax?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  total_charge_agent?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  total_charge_carrier?: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  executed_date: Date;

  @IsNotEmpty()
  @IsString()
  place: string;
}