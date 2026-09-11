import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDebitNoteDto } from './create-debit-note.dto';
import { UpdateDebitNoteItemDto } from './update-debit-note-item.dto';
import { UpdateDebitNoteHawbDto } from './update-debit-note-hawb.dto';

export class UpdateDebitNoteDto extends PartialType(
  OmitType(CreateDebitNoteDto, ['items', 'debitNoteHawbs'] as const),
) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDebitNoteItemDto)
  items?: UpdateDebitNoteItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDebitNoteHawbDto)
  debitNoteHawbs?: UpdateDebitNoteHawbDto[];
}