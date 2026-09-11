import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LockMawbStockDto {
  @ApiProperty({ description: 'Agent ID locking the MAWB', example: 2 })
  @IsOptional()
  @IsInt()
  agent_id?: number;

  @ApiProperty({ description: 'Optional remarks', example: 'Reserved for customer X', required: false })
  @IsOptional()
  @IsString()
  remarks?: string;
}

