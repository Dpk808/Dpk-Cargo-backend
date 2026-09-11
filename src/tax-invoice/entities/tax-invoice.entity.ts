import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AppBaseEntity } from '../../common/entities/base.entity';
import { TaxInvoiceItems } from "./tax-invoice-items.entity";
import { Shipper } from "../../shipper/entities/shipper.entity";
import { Consignee } from "../../consignee/entities/consignee.entity";
import { Agent } from "../../agent/entities/agent.entity";
import { Mawb } from "../../mawb/entities/mawb.entity";

@Entity({ schema: "accounting", name: "tax-invoice" })
export class TaxInvoice extends AppBaseEntity {

  @Column({ type: 'varchar', length: 20 })
  invoice_no: string;

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

  @ManyToOne(() => Mawb, { nullable: false})
  @JoinColumn({ name: 'mawb_id' })
  mawb: Mawb;

  // ── Financials ────────────────────────────────────────────────────────

  @Column({ type: 'boolean', default: false })
  is_usd: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sub_total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  taxable_amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  vat_rate: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  vat_amount: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  grandtotal: number;

  @Column({ type: 'varchar', length: 255 })
  in_words: string;

  // ── Children ──────────────────────────────────────────────────────────

  @OneToMany(() => TaxInvoiceItems, (items) => items.taxInvoice, { cascade: true })
  items: TaxInvoiceItems[];
}