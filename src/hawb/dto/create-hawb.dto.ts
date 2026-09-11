import { IsString, IsNumber, IsOptional, IsNotEmpty, IsEnum, IsInt, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WeightUnit, RateClass, DimensionUnit } from '../../common/enums/cargo.enums';
import { CreateHawbAirportDto } from './create-hawb-airport.dto';
import { CreateHawbAccountingDto } from './create-hawb-accounting.dto';
import { CreateHawbBillingDto } from './create-hawb-billing.dto';
import { CreateHawbDimensionDto } from './create-hawb-dimension.dto';
import { CreateHawbOtherChargeDto } from './create-hawb-other-charge.dto';
import { CreateNatureOfGoodsDto } from '../../mawb/dto/create-nature-of-goods.dto';

export class CreateHawbDto {
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

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  rate?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  total?: number;

  @IsNotEmpty()
  @IsEnum(DimensionUnit)
  dimension_unit: DimensionUnit;

  @IsOptional()
  @IsString()
  mawb_id?: string;

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
  @ValidateNested()
  @Type(() => CreateHawbAirportDto)
  airport?: CreateHawbAirportDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateHawbAccountingDto)
  accounting?: CreateHawbAccountingDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateHawbBillingDto)
  billing?: CreateHawbBillingDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateHawbDimensionDto)
  dimensions?: CreateHawbDimensionDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateHawbOtherChargeDto)
  otherCharge?: CreateHawbOtherChargeDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateNatureOfGoodsDto)
  natureOfGoods?: CreateNatureOfGoodsDto[];
}