import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Shipper } from '../../shipper/entities/shipper.entity';
import { Consignee } from '../../consignee/entities/consignee.entity';
import { HawbAirport } from './hawb_airport.entity';
import { HawbDimension } from './hawb_dimension.entity';
import { HawbAccounting } from './hawb_accounting.entity';
import { Agent } from '../../agent/entities/agent.entity';
import { Mawb } from '../../mawb/entities/mawb.entity';
import { HawbBilling } from './hawb_billing.entity';
import { HawbOtherCharge } from './hawb_other_charge.entity';
import { WeightUnit, RateClass, DimensionUnit } from '../../common/enums/cargo.enums';
import { HawbNatureOfGoods } from './hawb_nature_of_goods.entity';

@Entity({ schema: 'hawb', name: 'hawb' })
export class Hawb extends AppBaseEntity {
  @Column({ type: 'text', nullable: true })
  information: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  note: string | null;

  @Column({ type: 'int' })
  no_of_pieces: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  gross_weight: number;

  @Column({ type: 'enum', enum: WeightUnit })
  unit: WeightUnit;

  @Column({ type: 'enum', enum: RateClass })
  rate_class: RateClass;

  @Column({ type: 'varchar', length: 255, nullable: true })
  commodity_item_no: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  chargable_weight: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  rate: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number | null;

  @Column({ type: 'enum', enum: DimensionUnit })
  dimension_unit: DimensionUnit;

  @Column({ type: 'varchar', length: 20, nullable: true })
  account_no: string | null;

  // RELATIONS
  @ManyToOne(() => Mawb, (mawb) => mawb.hawbs)
  @JoinColumn({ name: 'mawb_id' })
  mawb: Mawb;

  @ManyToOne(() => Shipper)
  @JoinColumn({ name: 'shipper_id' })
  shipper: Shipper;

  @ManyToOne(() => Consignee)
  @JoinColumn({ name: 'consignee_id' })
  consignee: Consignee;

  @ManyToOne(() => Agent)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  @OneToOne(() => HawbAirport, (airport) => airport.hawb, { cascade: true })
  airport: HawbAirport;

  @OneToOne(() => HawbAccounting, (acc) => acc.hawb, { cascade: true })
  accounting: HawbAccounting;

  @OneToOne(() => HawbBilling, (billing) => billing.hawb, { cascade: true })
  billing: HawbBilling;

  @OneToMany(() => HawbOtherCharge, (charge) => charge.hawb, { cascade: true })
  otherCharge: HawbOtherCharge[];

  @OneToMany(() => HawbNatureOfGoods, (nature) => nature.hawb, { cascade: true })
  natureOfGoods: HawbNatureOfGoods[];

  @OneToMany(() => HawbDimension, (dim) => dim.hawb, { cascade: true })
  dimensions: HawbDimension[];

  // @OneToMany(() => TaxInvoiceHawbs, (ih) => ih.hawb, { cascade: true })
  // invoiceHawbs: TaxInvoiceHawbs[];
}