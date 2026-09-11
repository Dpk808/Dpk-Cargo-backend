import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyBank } from './entities/bank.entity';
import { Company } from '../company/entities/company.entity';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(CompanyBank)
    private readonly bankRepository: Repository<CompanyBank>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createBankDto: CreateBankDto): Promise<CompanyBank> {
    const companies = await this.companyRepository.find({ take: 1 });
    if (!companies.length) {
      throw new BadRequestException('No company found to attach the bank to.');
    }
    const company = companies[0];
    const bank = this.bankRepository.create({ ...createBankDto, company });
    return await this.bankRepository.save(bank);
  }

  async findAll(): Promise<CompanyBank[]> {
    return await this.bankRepository.find();
  }

  async findOne(id: number): Promise<CompanyBank> {
    const bank = await this.bankRepository.findOne({ where: { id } });
    if (!bank) {
      throw new NotFoundException(`Bank with id ${id} not found`);
    }
    return bank;
  }

  async update(id: number, updateBankDto: UpdateBankDto): Promise<CompanyBank> {
    const bank = await this.findOne(id);
    Object.assign(bank, updateBankDto);
    return await this.bankRepository.save(bank);
  }

  async remove(id: number): Promise<{ message: string }> {
    const bank = await this.findOne(id);
    await this.bankRepository.remove(bank);
    return { message: `Bank ${bank.bankName} deleted successfully` };
  }
}
