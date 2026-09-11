import {
    IsString, IsDateString, IsBoolean, IsNumber, IsOptional,
    IsArray, ValidateNested, IsInt, IsPositive, MaxLength, Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  import { CreateCreditNoteItemDto } from './create-credit-note-item.dto';
  import { CreateCreditNoteHawbDto } from './create-credit-note-hawb.dto';
  
  export class CreateCreditNoteDto {
    @ApiProperty({ description: 'Credit note number', example: 'CN-001' })
    @IsString()
    @MaxLength(20)
    credit_note_no: string;
  
    @ApiProperty({ description: 'Date of credit note', example: '2026-01-31' })
    @IsDateString()
    date: string;
  
    // ── Client (only one should be provided) ─────────────────────────────
  
    @ApiProperty({ description: 'Shipper ID', example: 1, required: false })
    @IsOptional()
    @IsInt()
    @IsPositive()
    shipper_id?: number | null;
  
    @ApiProperty({ description: 'Consignee ID', example: 2, required: false })
    @IsOptional()
    @IsInt()
    @IsPositive()
    consignee_id?: number | null;
  
    @ApiProperty({ description: 'Agent ID', example: 3, required: false })
    @IsOptional()
    @IsInt()
    @IsPositive()
    agent_id?: number | null;
  
    // ── Mawb + Hawbs (hawbs only relevant if mawb is provided) ───────────
  
    @ApiProperty({ description: 'MAWB ID', example: 5, required: false })
    @IsOptional()
    @IsInt()
    @IsPositive()
    mawb_id?: number | null;
  
    @ApiProperty({ description: 'HAWBs for credit note', type: [CreateCreditNoteHawbDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCreditNoteHawbDto)
    creditNoteHawbs?: CreateCreditNoteHawbDto[];
  
    // ── Financials ────────────────────────────────────────────────────────
  
    @ApiProperty({ description: 'Is USD', example: false, required: false })
    @IsOptional()
    @IsBoolean()
    is_usd?: boolean;
  
    @ApiProperty({ description: 'Grand total amount', example: 100.0 })
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    grandtotal: number;
  
    @ApiProperty({ description: 'Amount in words', example: 'One hundred' })
    @IsString()
    @MaxLength(255)
    in_words: string;
  
    // ── Items ─────────────────────────────────────────────────────────────
  
    @ApiProperty({ description: 'Line items', type: [CreateCreditNoteItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCreditNoteItemDto)
    items: CreateCreditNoteItemDto[];
  }