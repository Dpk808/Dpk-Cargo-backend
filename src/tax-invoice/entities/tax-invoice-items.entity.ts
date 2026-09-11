import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AppBaseEntity } from '../../common/entities/base.entity';
import { TaxInvoice } from "./tax-invoice.entity";

@Entity({ schema: "accounting", name: "tax-invoice-items" })
export class TaxInvoiceItems extends AppBaseEntity {

  @Column({ type: "int" })
  s_no: number;

  @Column({ type: "varchar", length: 10, nullable: true })
  hs_code: string | null;

  @Column({ type: "varchar", length: 255 })
  particulars: string;

  @Column({ type: "int", nullable: true })
  quantity: number | null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  rate: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => TaxInvoice, (taxInvoice) => taxInvoice.items)
  taxInvoice: TaxInvoice;
}