import { PartialType } from '@nestjs/mapped-types';
import { CreateHawbDimensionDto } from './create-hawb-dimension.dto';

export class UpdateHawbDimensionDto extends PartialType(CreateHawbDimensionDto) {}
