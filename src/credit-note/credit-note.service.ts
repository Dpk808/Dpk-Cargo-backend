import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreditNote } from './entities/credit-note.entity';
import { CreditNoteItems } from './entities/credit-note-items.entity';
import { CreditNoteHawbs } from './entities/credit-note-hawbs.entity';
import { CreateCreditNoteDto } from './dto/create-credit-note.dto';
import { UpdateCreditNoteDto } from './dto/update-credit-note.dto';

@Injectable()
export class CreditNoteService {
    constructor(
        @InjectRepository(CreditNote)
        private readonly creditNoteRepository: Repository<CreditNote>,
    
        @InjectRepository(CreditNoteItems)
        private readonly creditNoteItemsRepository: Repository<CreditNoteItems>,
    
        @InjectRepository(CreditNoteHawbs)
        private readonly creditNoteHawbsRepository: Repository<CreditNoteHawbs>,
      ) {}

    private get loadRelations() {
    return {
        relations: {
        shipper: true,
        consignee: true,
        agent: true,
        mawb: true,
        items: true,
        creditNoteHawbs: {
            hawb: true,
        },
        },
    };
    }

    async findAll(): Promise<CreditNote[]> {
        return this.creditNoteRepository.find({
          ...this.loadRelations,
          order: { id: 'DESC' },
        });
      }

    async findOne(id: number): Promise<CreditNote> {
        const creditNote = await this.creditNoteRepository.findOne({
          where: { id },
          ...this.loadRelations,
        });
    
        if (!creditNote) {
          throw new NotFoundException(`Credit note with id ${id} not found`);
        }
    
        return creditNote;
      }

      async create(dto: CreateCreditNoteDto): Promise<CreditNote> {
        const { items, creditNoteHawbs, shipper_id, consignee_id, agent_id, mawb_id, ...creditNoteFields } = dto;
      
        const creditNote = this.creditNoteRepository.create({
          ...creditNoteFields,
          shipper: shipper_id ? { id: shipper_id } : null,
          consignee: consignee_id ? { id: consignee_id } : null,
          agent: agent_id ? { id: agent_id } : null,
          mawb: mawb_id ? { id: mawb_id } : null,
          items: items,
          creditNoteHawbs: creditNoteHawbs
            ? creditNoteHawbs.map((h) => ({ hawb: { id: h.hawb_id } }))
            : [],
        });
      
        return this.creditNoteRepository.save(creditNote);
      }

      async update(id: number, dto: UpdateCreditNoteDto): Promise<CreditNote> {
        const creditNote = await this.findOne(id);
    
        const { items, creditNoteHawbs, shipper_id, consignee_id, agent_id, mawb_id, ...creditNoteFields } = dto;
    
        Object.assign(creditNote, creditNoteFields);
    
        if (shipper_id !== undefined) creditNote.shipper = shipper_id ? { id: shipper_id } as any : null;
        if (consignee_id !== undefined) creditNote.consignee = consignee_id ? { id: consignee_id } as any : null;
        if (agent_id !== undefined) creditNote.agent = agent_id ? { id: agent_id } as any : null;
        if (mawb_id !== undefined) creditNote.mawb = mawb_id ? { id: mawb_id } as any : null;
    
        if (items !== undefined) {
          await this.creditNoteItemsRepository.delete({ creditNote: { id: creditNote.id } });
          creditNote.items = items.map((item) => this.creditNoteItemsRepository.create(item));
        }
    
        if (creditNoteHawbs !== undefined) {
          await this.creditNoteHawbsRepository.delete({ creditNote: { id: creditNote.id } });
          creditNote.creditNoteHawbs = creditNoteHawbs.map((h) =>
            this.creditNoteHawbsRepository.create({ hawb: { id: h.hawb_id } }),
          );
        }
    
        return this.creditNoteRepository.save(creditNote);
      }
    
      async remove(id: number): Promise<{ message: string }> {
        const creditNote = await this.findOne(id);
        await this.creditNoteRepository.softDelete(creditNote.id);
        return { message: `Credit note ${creditNote.credit_note_no} deleted successfully` };
      }
}

