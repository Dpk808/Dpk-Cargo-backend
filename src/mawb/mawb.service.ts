import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Mawb } from './entities/mawb.entity';
import { CreateMawbDto } from './dto/create-mawb.dto';
import { UpdateMawbDto } from './dto/update-mawb.dto';
import { Hawb } from '../hawb/entities/hawb.entity';

@Injectable()
export class MawbService {
  constructor(
    @InjectRepository(Mawb)
    private readonly mawbRepo: Repository<Mawb>,
    private readonly dataSource: DataSource,
  ) { }

  // CREATE (with transaction)
  async create(dto: CreateMawbDto) {
    return this.dataSource.transaction(async (manager) => {
      const { shipper_id, consignee_id, agent_id, account_no, hawbs, ...mawbData } = dto;

      const mawb = manager.create(Mawb, mawbData);

      if (shipper_id) {
        mawb.shipper = { id: shipper_id } as any;
      }
      if (consignee_id) {
        mawb.consignee = { id: consignee_id } as any;
      }
      if (agent_id) {
        mawb.agent = { id: agent_id } as any;
      }
      if (account_no) {
        mawb.account_no = account_no;
      }

      if (hawbs && hawbs.length > 0) {
        mawb.hawbs = hawbs.map((hawbDto) => {
          const {
            shipper_id: h_shipper_id,
            consignee_id: h_consignee_id,
            agent_id: h_agent_id,
            ...hData
          } = hawbDto;
          const hawb = manager.create(Hawb, hData);
          if (h_shipper_id) hawb.shipper = { id: h_shipper_id } as any;
          if (h_consignee_id) hawb.consignee = { id: h_consignee_id } as any;
          if (h_agent_id) hawb.agent = { id: h_agent_id } as any;
          return hawb;
        });
      }

      return await manager.save(mawb);
    });
  }

  // GET ALL (with relations)
  async findAll() {
    return this.mawbRepo.find({
      relations: ['shipper', 'consignee', 'agent', 'airport', 'accounting', 'billing', 'dimensions', 'otherCharge', 'hawbs', 'hawbs.shipper', 'hawbs.consignee', 'hawbs.accounting'],
    });
  }

  // GET ONE
  async findOne(id: number) {
    return this.mawbRepo.findOne({
      where: { id },
      relations: ['shipper', 'consignee', 'agent', 'airport', 'accounting', 'billing', 'dimensions', 'otherCharge', 'hawbs', 'hawbs.shipper', 'hawbs.consignee', 'hawbs.accounting'],
    });
  }

  // UPDATE
  async update(id: number, dto: UpdateMawbDto) {
    const existing = await this.mawbRepo.findOne({
      where: { id },
      relations: ['shipper', 'consignee', 'agent', 'airport', 'accounting', 'billing', 'dimensions', 'otherCharge', 'hawbs', 'hawbs.shipper', 'hawbs.consignee', 'hawbs.accounting'],
    });

    if (!existing) {
      throw new NotFoundException(`MAWB with id ${id} not found`);
    }

    const merged = this.mawbRepo.merge(existing, dto as Partial<Mawb>);
    return this.mawbRepo.save(merged);
  }

  // DELETE (soft delete via base entity)
  async remove(id: number) {
    return this.mawbRepo.softDelete(id);
  }
}
