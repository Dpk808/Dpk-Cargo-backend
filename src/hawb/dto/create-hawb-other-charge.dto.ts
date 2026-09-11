import { IsString, IsNumber, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';

export enum ChargeType {
  AGENT = 'AGENT',
  CARRIER = 'CARRIER',
}

export class CreateHawbOtherChargeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsNotEmpty()
  @IsEnum(ChargeType)
  type: ChargeType;
}