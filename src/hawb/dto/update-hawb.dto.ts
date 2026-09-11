import { PartialType } from '@nestjs/mapped-types';
import { CreateHawbDto } from './create-hawb.dto';

export class UpdateHawbDto extends PartialType(CreateHawbDto) {}
