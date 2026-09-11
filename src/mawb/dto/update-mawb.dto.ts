import { PartialType } from '@nestjs/mapped-types';
import { CreateMawbDto } from './create-mawb.dto';

export class UpdateMawbDto extends PartialType(CreateMawbDto) {}
