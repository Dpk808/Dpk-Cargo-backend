import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCreditNoteDto } from './create-credit-note.dto';
import { UpdateCreditNoteItemDto } from './update-credit-note-item.dto';
import { UpdateCreditNoteHawbDto } from './update-credit-note-hawb.dto';

export class UpdateCreditNoteDto extends PartialType(
  OmitType(CreateCreditNoteDto, ['items', 'creditNoteHawbs'] as const),
) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCreditNoteItemDto)
  items?: UpdateCreditNoteItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCreditNoteHawbDto)
  creditNoteHawbs?: UpdateCreditNoteHawbDto[];
}