import { IsBoolean, IsString, IsNumber, IsOptional, IsNotEmpty, MaxLength, IsIn } from 'class-validator';

export class CreateAccountingDto {
  @IsOptional()
  @IsBoolean()
  is_prepaid?: boolean;

  @IsOptional()
  @IsBoolean()
  is_collect?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reference_number?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  currency: string;

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