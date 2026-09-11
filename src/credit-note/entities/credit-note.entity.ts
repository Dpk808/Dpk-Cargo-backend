import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Shipper } from '../../shipper/entities/shipper.entity';
import { Consignee } from '../../consignee/entities/consignee.entity';
import { Agent } from '../../agent/entities/agent.entity';
import { Mawb } from '../../mawb/entities/mawb.entity';
import { CreditNoteItems } from './credit-note-items.entity';
import { CreditNoteHawbs } from './credit-note-hawbs.entity';

@Entity({ schema: 'accounting', name: 'credit_note' })
export class CreditNote extends AppBaseEntity {
  @Column({ type: 'varchar', length: 20 })
  credit_note_no: string;
  //debitnoteno

  @Column({ type: 'date' })
  date: Date;

  // ── Relations (shipper/consignee/agent are optional) ──────────────────

  @ManyToOne(() => Shipper, { nullable: true })
  @JoinColumn({ name: 'shipper_id' })
  shipper: Shipper | null;

  @ManyToOne(() => Consignee, { nullable: true })
  @JoinColumn({ name: 'consignee_id' })
  consignee: Consignee | null;

  @ManyToOne(() => Agent, { nullable: true })
  @JoinColumn({ name: 'agent_id' })
  agent: Agent | null;

  @ManyToOne(() => Mawb, { nullable: true })
  @JoinColumn({ name: 'mawb_id' })
  mawb: Mawb | null;

  // ── Financials ────────────────────────────────────────────────────────

  @Column({ type: 'boolean', default: false })
  is_usd: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  grandtotal: number;

  @Column({ type: 'varchar', length: 255 })
  in_words: string;

  // ── Children ──────────────────────────────────────────────────────────

  @OneToMany(() => CreditNoteItems, (items) => items.creditNote, {cascade: true,})
  items: CreditNoteItems[];
  
  @OneToMany(() => CreditNoteHawbs, (ch) => ch.creditNote, { cascade: true })
  creditNoteHawbs: CreditNoteHawbs[];
}
