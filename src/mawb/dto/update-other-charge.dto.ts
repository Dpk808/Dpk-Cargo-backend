import { PartialType } from '@nestjs/mapped-types';
import { CreateOtherChargeDto } from './create-other-charge.dto';

export class UpdateOtherChargeDto extends PartialType(CreateOtherChargeDto) {}
