import {
    IsString, IsDateString, IsBoolean, IsNumber, IsOptional,
    IsArray, ValidateNested, IsInt, IsPositive, MaxLength, Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  import { CreateDebitNoteItemDto } from './create-debit-note-item.dto';
  import { CreateDebitNoteHawbDto } from './create-debit-note-hawb.dto';
  
  export class CreateDebitNoteDto {
    @ApiProperty({ description: 'Debit note number', example: 'DN-001' })
    @IsString()
    @MaxLength(20)
    debit_note_no: string;
  
    @ApiProperty({ description: 'Date of debit note', example: '2026-01-31' })
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
  
    // ── Mawb + Hawbs ─────────────────────────────────────────────────────
  
    @ApiProperty({ description: 'MAWB ID', example: 5, required: false })
    @IsOptional()
    @IsInt()
    @IsPositive()
    mawb_id?: number | null;
  
    @ApiProperty({ description: 'Hawbs for the debit note', type: [CreateDebitNoteHawbDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDebitNoteHawbDto)
    debitNoteHawbs?: CreateDebitNoteHawbDto[];
  
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
  
    @ApiProperty({ description: 'Line items', type: [CreateDebitNoteItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDebitNoteItemDto)
    items: CreateDebitNoteItemDto[];
  }