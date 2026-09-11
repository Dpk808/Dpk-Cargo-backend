import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { MawbStock, MawbStockStatus } from './entities/mawb-stock.entity';
import { CreateMawbStockRangeDto } from './dto/create-mawb-stock-range.dto';
import { Airline } from '../airlines/entities/airline.entity';
import { Agent } from '../agent/entities/agent.entity';
import { LockMawbStockDto } from './dto/lock-mawb-stock.dto';

@Injectable()
export class MawbStockService {
  constructor(
    @InjectRepository(MawbStock)
    private readonly mawbStockRepository: Repository<MawbStock>,
    @InjectRepository(Airline)
    private readonly airlineRepository: Repository<Airline>,
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}

  private computeCheckDigit(serial: number): number {
    return serial % 7;
  }

  async createRange(dto: CreateMawbStockRangeDto): Promise<MawbStock[]> {
    if (dto.start_serial > dto.end_serial) {
      throw new BadRequestException('start_serial cannot be greater than end_serial');
    }

    const airline = await this.airlineRepository.findOne({ where: { id: dto.airline_id } });
    if (!airline) {
      throw new NotFoundException(`Airline with id ${dto.airline_id} not found`);
    }

    const airlinePrefix = airline.prefixCode?.trim();
    if (!airlinePrefix) {
      throw new BadRequestException('Selected airline does not have a prefix code');
    }

    const startSerial = this.padSerial(dto.start_serial);
    const endSerial = this.padSerial(dto.end_serial);

    const existing = await this.mawbStockRepository.find({
      where: {
        airline: { id: airline.id },
        airline_prefix: airlinePrefix,
        serial_no: Between(startSerial, endSerial),
      },
    });

    if (existing.length > 0) {
      const existingSerials = new Set(existing.map((item) => item.serial_no));
      const duplicates: string[] = [];
      for (let serial = dto.start_serial; serial <= dto.end_serial; serial += 1) {
        const padded = this.padSerial(serial);
        if (existingSerials.has(padded)) {
          duplicates.push(padded);
        }
      }
      throw new BadRequestException(`Some MAWB stock entries already exist: ${duplicates.join(', ')}`);
    }

    const items = Array.from({ length: dto.end_serial - dto.start_serial + 1 }, (_, index) => {
      const serialNum = dto.start_serial + index;
      const serial = this.padSerial(serialNum);
      const checkDigit = this.computeCheckDigit(serialNum);
      return this.mawbStockRepository.create({
        airline,
        airline_prefix: airlinePrefix,
        serial_no: serial,
        check_digit: checkDigit.toString(),
        status: MawbStockStatus.AVAILABLE,
        remarks: dto.remarks ?? null,
        heldByAgent: null,
        held_at: null,
        used_at: null,
      });
    });

    return this.mawbStockRepository.save(items);
  }

  async findAll(airlineId?: number): Promise<MawbStock[]> {
    if (airlineId) {
      return this.mawbStockRepository.find({
        where: { airline: { id: airlineId } },
        order: { createdAt: 'DESC', serial_no: 'ASC' },
      });
    }

    return this.mawbStockRepository.find({
      order: { createdAt: 'DESC', serial_no: 'ASC' },
    });
  }

  async hold(id: number, dto: LockMawbStockDto): Promise<MawbStock> {
    const stock = await this.mawbStockRepository.findOne({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`MAWB stock with id ${id} not found`);
    }

    if (stock.status === MawbStockStatus.USED) {
      throw new BadRequestException('Used MAWB stock cannot be held');
    }

    if (stock.status === MawbStockStatus.HELD) {
      throw new BadRequestException('MAWB stock is already held');
    }

    let agent: Agent | null = null;
    if (dto.agent_id) {
      agent = await this.agentRepository.findOne({ where: { id: dto.agent_id } });
      if (!agent) {
        throw new NotFoundException(`Agent with id ${dto.agent_id} not found`);
      }
    }

    stock.status = MawbStockStatus.HELD;
    stock.heldByAgent = agent;
    stock.held_at = new Date();
    stock.remarks = dto.remarks ?? stock.remarks;

    return this.mawbStockRepository.save(stock);
  }

  async release(id: number): Promise<MawbStock> {
    const stock = await this.mawbStockRepository.findOne({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`MAWB stock with id ${id} not found`);
    }

    if (stock.status === MawbStockStatus.USED) {
      throw new BadRequestException('Used MAWB stock cannot be released');
    }

    stock.status = MawbStockStatus.AVAILABLE;
    stock.heldByAgent = null;
    stock.held_at = null;

    return this.mawbStockRepository.save(stock);
  }

  async remove(id: number): Promise<{ message: string }> {
    const stock = await this.mawbStockRepository.findOne({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`MAWB stock with id ${id} not found`);
    }

    if (stock.status !== MawbStockStatus.AVAILABLE) {
      throw new BadRequestException('Only available MAWB stock can be deleted');
    }

    await this.mawbStockRepository.softDelete(id);
    return { message: 'MAWB stock deleted successfully' };
  }

  private padSerial(value: number): string {
    return String(value).padStart(7, '0');
  }

  async findAvailableByPrefix(airlinePrefix: string): Promise<MawbStock | null> {
    const availableStock = await this.mawbStockRepository.findOne({
      where: { airline_prefix: airlinePrefix, status: MawbStockStatus.AVAILABLE },
      order: { serial_no: 'ASC' },
    });

    if (availableStock) {
      await this.markAsStarted(availableStock.id);
    }
    return availableStock;
  }

  async markAsStarted(id: number): Promise<void> {
    const stock = await this.mawbStockRepository.findOne({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`MAWB stock with id ${id} not found`);
    }
    
    if (stock.status !== MawbStockStatus.HELD && stock.status !== MawbStockStatus.USED && stock.status !== MawbStockStatus.INUSE) {
      stock.status = MawbStockStatus.INUSE;
      stock.mawb_started_at = new Date();
      await this.mawbStockRepository.save(stock);
    }
  }
}
