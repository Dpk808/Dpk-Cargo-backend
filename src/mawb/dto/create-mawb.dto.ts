import { IsString, IsNumber, IsOptional, IsNotEmpty, IsEnum, IsInt, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WeightUnit, RateClass, DimensionUnit } from '../../common/enums/cargo.enums';
import { CreateAirportDto } from './create-airport.dto';
import { CreateAccountingDto } from './create-accounting.dto';
import { CreateBillingDto } from './create-billing.dto';
import { CreateDimensionDto } from './create-dimension.dto';
import { CreateOtherChargeDto } from './create-other-charge.dto';
import { CreateNatureOfGoodsDto } from './create-nature-of-goods.dto';
import { CreateHawbDto } from '../../hawb/dto/create-hawb.dto';

export class CreateMawbDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  airline_prefix: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(7)
  serial_no: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1)
  check_digit: string;

  @IsOptional()
  @IsString()
  information?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string;

  @IsNotEmpty()
  @IsInt()
  no_of_pieces: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  gross_weight: number;

  @IsNotEmpty()
  @IsEnum(WeightUnit)
  unit: WeightUnit;

  @IsNotEmpty()
  @IsEnum(RateClass)
  rate_class: RateClass;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  commodity_item_no?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  chargable_weight: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  rate: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;

  @IsNotEmpty()
  @IsEnum(DimensionUnit)
  dimension_unit: DimensionUnit;

  @IsOptional()
  @IsString()
  shipper_id?: string;

  @IsOptional()
  @IsString()
  consignee_id?: string;

  @IsOptional()
  @IsString()
  agent_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  account_no?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city_name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAirportDto)
  airport?: CreateAirportDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAccountingDto)
  accounting?: CreateAccountingDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBillingDto)
  billing?: CreateBillingDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDimensionDto)
  dimensions?: CreateDimensionDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOtherChargeDto)
  otherCharge?: CreateOtherChargeDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateNatureOfGoodsDto)
  natureOfGoods?: CreateNatureOfGoodsDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateHawbDto)
  hawbs?: CreateHawbDto[];
}