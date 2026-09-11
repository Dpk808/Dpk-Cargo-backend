import { PartialType } from '@nestjs/mapped-types';
import { CreateHawbAirportDto } from './create-hawb-airport.dto';

export class UpdateHawbAirportDto extends PartialType(CreateHawbAirportDto) {}
