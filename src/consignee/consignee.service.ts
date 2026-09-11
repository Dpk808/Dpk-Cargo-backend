
// @Injectable()
// export class ConsigneeService {}


// consignees/consignees.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consignee } from './entities/consignee.entity';
import { CreateConsigneeDto } from './dto/create-consignee.dto';
import { UpdateConsigneeDto } from './dto/update-consignee.dto';
@Injectable()
export class ConsigneeService {
  constructor(
    @InjectRepository(Consignee)
    private readonly consigneeRepository: Repository<Consignee>,
  ) {}

  async create(createConsigneeDto: CreateConsigneeDto): Promise<Consignee> {
    const consignee = this.consigneeRepository.create(createConsigneeDto);
    return await this.consigneeRepository.save(consignee);
  }

  async findAll(): Promise<Consignee[]> {
    return await this.consigneeRepository.find();
  }

  async findOne(id: number): Promise<Consignee> {
    const consignee = await this.consigneeRepository.findOne({ where: { id } });
    if (!consignee) {
      throw new NotFoundException(`Consignee with id ${id} not found`);
    }
    return consignee;
  }

  async update(id: number, updateConsigneeDto: UpdateConsigneeDto): Promise<Consignee> {
    const consignee = await this.findOne(id);
    Object.assign(consignee, updateConsigneeDto);
    return await this.consigneeRepository.save(consignee);
  }

  async remove(id: number): Promise<{ message: string }> {
    const consignee = await this.findOne(id);
    await this.consigneeRepository.softDelete(consignee.id);
    return { message: `Consignee ${consignee.name} deleted successfully` };
  }
}