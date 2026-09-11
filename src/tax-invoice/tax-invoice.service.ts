import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxInvoice } from './entities/tax-invoice.entity';
import { TaxInvoiceItems } from './entities/tax-invoice-items.entity';
import { CreateTaxInvoiceDto } from './dto/create-tax-invoice.dto';
import { UpdateTaxInvoiceDto } from './dto/update-tax-invoice.dto';

@Injectable()
export class TaxInvoiceService {
  constructor(
    @InjectRepository(TaxInvoice)
    private readonly invoiceRepository: Repository<TaxInvoice>,

    @InjectRepository(TaxInvoiceItems)
    private readonly itemsRepository: Repository<TaxInvoiceItems>,
  ) {}

  private get loadRelations() {
    return {
      relations: {
        shipper: true,
        consignee: true,
        agent: true,
        items: true,
      },
    };
  }

  async findOne(id: number): Promise<TaxInvoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      ...this.loadRelations,
    });

    if (!invoice) {
      throw new NotFoundException(`Tax invoice with id ${id} not found`);
    }

    return invoice;
  }

  async create(dto: CreateTaxInvoiceDto): Promise<TaxInvoice> {
    const { items, shipper_id, consignee_id, agent_id, mawb_id, ...invoiceFields } = dto;

    const invoice = this.invoiceRepository.create({
      ...invoiceFields,
      mawb: { id: mawb_id },
      shipper: shipper_id ? { id: shipper_id } : null,
      consignee: consignee_id ? { id: consignee_id } : null,
      agent: agent_id ? { id: agent_id } : null,
      items: items.map((item) => this.itemsRepository.create(item)),
    });

    return this.invoiceRepository.save(invoice);
  }

  async findByMawb(mawbId: number): Promise<TaxInvoice[]> {
    return this.invoiceRepository.find({
      where: { mawb: { id: mawbId } },
      ...this.loadRelations,
    });
  }

  async update(id: number, dto: UpdateTaxInvoiceDto): Promise<TaxInvoice> {
    const invoice = await this.findOne(id);

    const { items, shipper_id, consignee_id, agent_id, mawb_id, ...invoiceFields } = dto;

    Object.assign(invoice, invoiceFields);

    if (mawb_id !== undefined) invoice.mawb = { id: mawb_id } as any;
    if (shipper_id !== undefined) invoice.shipper = shipper_id ? { id: shipper_id } as any : null;
    if (consignee_id !== undefined) invoice.consignee = consignee_id ? { id: consignee_id } as any : null;
    if (agent_id !== undefined) invoice.agent = agent_id ? { id: agent_id } as any : null;

    if (items !== undefined) {
      await this.itemsRepository.delete({ taxInvoice: { id: invoice.id } });
      invoice.items = items.map((item) => this.itemsRepository.create(item));
    }

    return this.invoiceRepository.save(invoice);
  }

  async remove(id: number): Promise<{ message: string }> {
    const invoice = await this.findOne(id);
    await this.invoiceRepository.softDelete(invoice.id);
    return { message: `Tax invoice ${invoice.invoice_no} deleted successfully` };
  }
}