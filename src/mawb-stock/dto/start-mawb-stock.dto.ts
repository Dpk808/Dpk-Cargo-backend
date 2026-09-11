import { IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartMawbStockDto {
  @ApiProperty({ description: 'Optional remarks', required: false })
  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiProperty({ description: 'Agent ID starting the MAWB', required: false })
  @IsOptional()
  @IsInt()
  agent_id?: number;
}
