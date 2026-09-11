import { IsString, IsNotEmpty, IsOptional, MaxLength, IsDateString } from 'class-validator';

export class CreateAirportDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  departure: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  destination: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  to: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  by_first_carrier: string;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  second_to?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  second_by?: string;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  third_to?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  third_by?: string;

  @IsNotEmpty()
  @IsDateString()
  flight_date: string;
}