import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirlineDto {
  @ApiProperty({ description: 'IATA code of the airline', example: 'AA' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  iataCode: string;

  @ApiProperty({ description: 'Prefix code of the airline', example: '001', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(5)
  prefixCode?: string;

  @ApiProperty({ description: 'Name of the airline', example: 'American Airlines', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Country of the airline', example: 'USA', required: false })
  @IsString()
  @IsOptional()
  country?: string;
}

