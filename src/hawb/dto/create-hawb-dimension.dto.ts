import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateHawbDimensionDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  length: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  width: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  height: number;
}