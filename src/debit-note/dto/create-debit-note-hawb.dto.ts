import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebitNoteHawbDto {
  @ApiProperty({ description: 'HAWB ID', example: 10 })
  @IsInt()
  @IsPositive()
  hawb_id: number;
}