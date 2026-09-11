import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DebitNote } from './entities/debit-note.entity';
import { DebitNoteItems } from './entities/debit-note-items.entity';
import { DebitNoteHawbs } from './entities/debit-note-hawbs.entity';
import { CreateDebitNoteDto } from './dto/create-debit-note.dto';
import { UpdateDebitNoteDto } from './dto/update-debit-note.dto';

@Injectable()
export class DebitNoteService {
  constructor(
    @InjectRepository(DebitNote)
    private readonly debitNoteRepository: Repository<DebitNote>,

    @InjectRepository(DebitNoteItems)
    private readonly debitNoteItemsRepository: Repository<DebitNoteItems>,

    @InjectRepository(DebitNoteHawbs)
    private readonly debitNoteHawbsRepository: Repository<DebitNoteHawbs>,
  ) {}

  private get loadRelations() {
    return {
      relations: {
        shipper: true,
        consignee: true,
        agent: true,
        mawb: true,
        items: true,
        debitNoteHawbs: {
          hawb: true,
        },
      },
    };
  }

  async findAll(): Promise<DebitNote[]> {
    return this.debitNoteRepository.find({
      ...this.loadRelations,
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<DebitNote> {
    const debitNote = await this.debitNoteRepository.findOne({
      where: { id },
      ...this.loadRelations,
    });

    if (!debitNote) {
      throw new NotFoundException(`Debit note with id ${id} not found`);
    }

    return debitNote;
  }


  async create(dto: CreateDebitNoteDto): Promise<DebitNote> {
    const { items, debitNoteHawbs, shipper_id, consignee_id, agent_id, mawb_id, ...debitNoteFields } = dto;
  
    const debitNote = this.debitNoteRepository.create({
      ...debitNoteFields,
      shipper: shipper_id ? { id: shipper_id } : null,
      consignee: consignee_id ? { id: consignee_id } : null,
      agent: agent_id ? { id: agent_id } : null,
      mawb: mawb_id ? { id: mawb_id } : null,
      items: items,
      debitNoteHawbs: debitNoteHawbs
        ? debitNoteHawbs.map((h) => ({ hawb: { id: h.hawb_id } }))
        : [],
    });
  
    return this.debitNoteRepository.save(debitNote);
  }

  async update(id: number, dto: UpdateDebitNoteDto): Promise<DebitNote> {
    const debitNote = await this.findOne(id);

    const { items, debitNoteHawbs, shipper_id, consignee_id, agent_id, mawb_id, ...debitNoteFields } = dto;

    Object.assign(debitNote, debitNoteFields);

    if (shipper_id !== undefined) debitNote.shipper = shipper_id ? { id: shipper_id } as any : null;
    if (consignee_id !== undefined) debitNote.consignee = consignee_id ? { id: consignee_id } as any : null;
    if (agent_id !== undefined) debitNote.agent = agent_id ? { id: agent_id } as any : null;
    if (mawb_id !== undefined) debitNote.mawb = mawb_id ? { id: mawb_id } as any : null;

    if (items !== undefined) {
      await this.debitNoteItemsRepository.delete({ debitNote: { id: debitNote.id } });
      debitNote.items = items.map((item) => this.debitNoteItemsRepository.create(item));
    }

    if (debitNoteHawbs !== undefined) {
      await this.debitNoteHawbsRepository.delete({ debitNote: { id: debitNote.id } });
      debitNote.debitNoteHawbs = debitNoteHawbs.map((h) =>
        this.debitNoteHawbsRepository.create({ hawb: { id: h.hawb_id } }),
      );
    }

    return this.debitNoteRepository.save(debitNote);
  }

  async remove(id: number): Promise<{ message: string }> {
    const debitNote = await this.findOne(id);
    await this.debitNoteRepository.softDelete(debitNote.id);
    return { message: `Debit note ${debitNote.debit_note_no} deleted successfully` };
  }
}