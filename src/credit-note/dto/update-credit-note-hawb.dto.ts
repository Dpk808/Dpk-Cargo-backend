import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditNoteHawbDto } from './create-credit-note-hawb.dto';

export class UpdateCreditNoteHawbDto extends PartialType(CreateCreditNoteHawbDto) {}