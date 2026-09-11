import { PartialType } from '@nestjs/mapped-types';
import { CreateHawbAccountingDto } from './create-hawb-accounting.dto';

export class UpdateHawbAccountingDto extends PartialType(CreateHawbAccountingDto) {}
