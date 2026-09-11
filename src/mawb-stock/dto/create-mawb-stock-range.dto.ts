import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMawbStockRangeDto {
  @ApiProperty({ description: 'Airline ID', example: 1 })
  @IsInt()
  airline_id: number;

  @ApiProperty({ description: 'Start serial', example: 1000000 })
  @IsInt()
  @Min(0)
  @Max(9999999)
  start_serial: number;

  @ApiProperty({ description: 'End serial', example: 1000100 })
  @IsInt()
  @Min(0)
  @Max(9999999)
  end_serial: number;

  @ApiProperty({ description: 'Check digit', example: '1' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1)
  check_digit: string;

  @ApiProperty({ description: 'Remarks', example: 'Initial load', required: false })
  @IsOptional()
  @IsString()
  remarks?: string;
}

