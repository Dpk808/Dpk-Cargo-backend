import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
import { Airline } from './entities/airline.entity';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectRepository(Airline)
    private readonly airlineRepository: Repository<Airline>,
  ) {}

  async create(createAirlineDto: CreateAirlineDto): Promise<Airline> {
    const airline = this.airlineRepository.create(createAirlineDto);
    return await this.airlineRepository.save(airline);
  }

  async findAll(): Promise<Airline[]> {
    return await this.airlineRepository.find();
  }

  async findByPrefix(prefix: string): Promise<Airline> {
    const airline = await this.airlineRepository.findOne({ where: { prefixCode: prefix } });
    if (!airline) {
      throw new NotFoundException(`Airline with prefix ${prefix} not found`);
    }
    return airline;
  }

  async findOne(id: number): Promise<Airline> {
    const airline = await this.airlineRepository.findOne({ where: { id } });
    if (!airline) {
      throw new NotFoundException(`Airline with id ${id} not found`);
    }
    return airline;
  }

  async update(id: number, updateAirlineDto: UpdateAirlineDto): Promise<Airline> {
    const airline = await this.findOne(id);
    Object.assign(airline, updateAirlineDto);
    return await this.airlineRepository.save(airline);
  }

  async remove(id: number): Promise<{ message: string }> {
    const airline = await this.findOne(id);
    await this.airlineRepository.delete({ id: airline.id });
    return { message: `Airline ${airline.iataCode} deleted successfully` };
  }
}
