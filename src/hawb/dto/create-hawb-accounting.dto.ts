import { IsBoolean, IsString, IsNumber, IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class CreateHawbAccountingDto {
  @IsOptional()
  @IsBoolean()
  is_prepaid?: boolean;

  @IsOptional()
  @IsBoolean()
  is_collect?: boolean;

  @IsNotEmpty()
  @IsString()
  @IsIn(['PP', 'CC'])
  chgs_code: string;

  @IsOptional()
  @IsBoolean()
  wt_val_ppd?: boolean;

  @IsOptional()
  @IsBoolean()
  wt_val_coll?: boolean;

  @IsOptional()
  @IsBoolean()
  other_ppd?: boolean;

  @IsOptional()
  @IsBoolean()
  other_coll?: boolean;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  declared_value_carriage?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  declared_value_customs?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  insurance_amt?: number;
}