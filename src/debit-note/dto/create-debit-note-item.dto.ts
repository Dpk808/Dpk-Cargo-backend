import { IsInt, IsPositive, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebitNoteItemDto {
  @ApiProperty({ description: 'Serial number', example: 1 })
  @IsInt()
  @IsPositive()
  s_no: number;

  @ApiProperty({ description: 'Particulars', example: 'Handling charges' })
  @IsString()
  @MaxLength(255)
  particulars: string;

  @ApiProperty({ description: 'Amount', example: 50.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;
}