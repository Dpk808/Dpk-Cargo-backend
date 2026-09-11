import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Hawb } from './entities/hawb.entity';
import { CreateHawbDto } from './dto/create-hawb.dto';
import { UpdateHawbDto } from './dto/update-hawb.dto';

@Injectable()
export class HawbService {
  constructor(
    @InjectRepository(Hawb)
    private readonly hawbRepo: Repository<Hawb>,
    private readonly dataSource: DataSource,
  ) {}

  // CREATE (with transaction)
  async create(dto: CreateHawbDto) {
    return this.dataSource.transaction(async (manager) => {
      const { mawb_id, shipper_id, consignee_id, agent_id, account_no, ...hawbData } = dto;
      
      const hawb = manager.create(Hawb, hawbData);
      
      if (mawb_id) {
        hawb.mawb = { id: mawb_id } as any;
      }
      if (shipper_id) {
        hawb.shipper = { id: shipper_id } as any;
      }
      if (consignee_id) {
        hawb.consignee = { id: consignee_id } as any;
      }
      if (agent_id) {
        hawb.agent = { id: agent_id } as any;
      }
      if (account_no) {
        hawb.account_no = account_no;
      }
      
      return await manager.save(hawb);
    });
  }

  // GET ALL (with relations)
  async findAll() {
    return this.hawbRepo.find({
      relations: [
        'mawb',
        'shipper',
        'consignee',
        'agent',
        'airport',
        'accounting',
        'billing',
        'dimensions',
        'otherCharge',
      ],
    });
  }

  // GET ONE
  async findOne(id: number) {
    return this.hawbRepo.findOne({
      where: { id },
      relations: [
        'mawb',
        'shipper',
        'consignee',
        'agent',
        'airport',
        'accounting',
        'billing',
        'dimensions',
        'otherCharge',
      ],
    });
  }

  // UPDATE
  async update(id: number, dto: UpdateHawbDto) {
    const existing = await this.hawbRepo.findOne({
      where: { id },
      relations: [
        'mawb',
        'shipper',
        'consignee',
        'agent',
        'airport',
        'accounting',
        'billing',
        'dimensions',
        'otherCharge',
      ],
    });

    if (!existing) {
      throw new NotFoundException(`HAWB with id ${id} not found`);
    }

    const merged = this.hawbRepo.merge(existing, dto as Partial<Hawb>);
    return this.hawbRepo.save(merged);
  }

  // DELETE (soft delete via base entity)
  async remove(id: number) {
    return this.hawbRepo.softDelete(id);
  }
}
