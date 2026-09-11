import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Shipper } from "../../shipper/entities/shipper.entity";
import { Consignee } from "../../consignee/entities/consignee.entity";
import { Agent } from "../../agent/entities/agent.entity";
import { Mawb } from "../../mawb/entities/mawb.entity";
import { DebitNoteItems } from "./debit-note-items.entity";
import { DebitNoteHawbs } from "./debit-note-hawbs.entity";


@Entity({ schema: "accounting", name: "debit_note" })
export class DebitNote extends AppBaseEntity {
    @Column({ type: 'varchar', length: 20 })
    debit_note_no: string;
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

    @ManyToOne(() => Mawb, { nullable: true})
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

    @OneToMany(() => DebitNoteItems, (items) => items.debitNote, { cascade: true })
      items: DebitNoteItems[];

    @OneToMany(() => DebitNoteHawbs, (dh) => dh.debitNote, { cascade: true })
    debitNoteHawbs: DebitNoteHawbs[];
  
}
