import { PartialType } from '@nestjs/mapped-types';
import { CreateDebitNoteHawbDto } from './create-debit-note-hawb.dto';

export class UpdateDebitNoteHawbDto extends PartialType(CreateDebitNoteHawbDto) {}