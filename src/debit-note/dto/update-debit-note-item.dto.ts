import { PartialType } from '@nestjs/mapped-types';
import { CreateDebitNoteItemDto } from './create-debit-note-item.dto';

export class UpdateDebitNoteItemDto extends PartialType(CreateDebitNoteItemDto) {}