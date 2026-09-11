import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditNoteItemDto } from './create-credit-note-item.dto';

export class UpdateCreditNoteItemDto extends PartialType(CreateCreditNoteItemDto) {}