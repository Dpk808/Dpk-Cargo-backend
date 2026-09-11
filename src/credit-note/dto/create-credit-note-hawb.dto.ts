import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCreditNoteHawbDto {
  @ApiProperty({ description: 'HAWB ID', example: 10 })
  @IsInt()
  @IsPositive()
  hawb_id: number;
}