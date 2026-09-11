import { PartialType } from '@nestjs/mapped-types';
import { CreateHawbBillingDto } from './create-hawb-billing.dto';

export class UpdateHawbBillingDto extends PartialType(CreateHawbBillingDto) {}
