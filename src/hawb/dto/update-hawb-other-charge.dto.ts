import { PartialType } from '@nestjs/mapped-types';
import { CreateHawbOtherChargeDto } from './create-hawb-other-charge.dto';

export class UpdateHawbOtherChargeDto extends PartialType(CreateHawbOtherChargeDto) {}
