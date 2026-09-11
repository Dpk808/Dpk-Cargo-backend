// shippers/shippers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { Shipper } from './entities/shipper.entity';

@Injectable()
export class ShipperService {
  constructor(
    @InjectRepository(Shipper)
    private readonly shipperRepository: Repository<Shipper>,
  ) {}

  async create(createShipperDto: CreateShipperDto): Promise<Shipper> {
    const shipper = this.shipperRepository.create(createShipperDto);
    return await this.shipperRepository.save(shipper);
  }

  async findAll(): Promise<Shipper[]> {
    return await this.shipperRepository.find();
  }

  async findOne(id: number): Promise<Shipper> {
    const shipper = await this.shipperRepository.findOne({ where: { id } });
    if (!shipper) {
      throw new NotFoundException(`Shipper with id ${id} not found`);
    }
    return shipper;
  }

  async update(id: number, updateShipperDto: UpdateShipperDto): Promise<Shipper> {
    const shipper = await this.findOne(id);
    Object.assign(shipper, updateShipperDto);
    return await this.shipperRepository.save(shipper);
  }

  async remove(id: number): Promise<{ message: string }> {
    const shipper = await this.findOne(id);
    await this.shipperRepository.softDelete(shipper.id);
    return { message: `Shipper ${shipper.name} deleted successfully` };
  }
}