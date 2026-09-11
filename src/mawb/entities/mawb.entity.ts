import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Accounting } from './accounting.entity';
import { Dimension } from './dimension.entity';
import { Airport } from './airport.entity';
import { Shipper } from '../../shipper/entities/shipper.entity';
import { Consignee } from '../../consignee/entities/consignee.entity';
import { Agent } from '../../agent/entities/agent.entity';
import { Hawb } from '../../hawb/entities/hawb.entity';
import { Billing } from './billing.entity';
import { OtherCharge } from './other_charge.entity';
import { WeightUnit, RateClass, DimensionUnit } from '../../common/enums/cargo.enums';
import { NatureOfGoods } from './nature_of_goods.entity';

@Entity({ schema: 'mawb', name: 'mawb' })
export class Mawb extends AppBaseEntity {
  @Column({ type: 'char', length: 3 })
  airline_prefix: string;

  @Column({ type: 'char', length: 7 })
  serial_no: string;

  @Column({ type: 'char', length: 1 })
  check_digit: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city_name: string | null;

  @Column({ type: 'text', nullable: true })
  information: string;

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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'enum', enum: DimensionUnit })
  dimension_unit: DimensionUnit | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  account_no: string | null;

  // RELATIONS
  @ManyToOne(() => Shipper)
  @JoinColumn({ name: 'shipper_id' })
  shipper: Shipper;

  @ManyToOne(() => Consignee)
  @JoinColumn({ name: 'consignee_id' })
  consignee: Consignee;

  @ManyToOne(() => Agent)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  @OneToOne(() => Airport, (airport) => airport.mawb, { cascade: true })
  airport: Airport;

  @OneToOne(() => Accounting, (acc) => acc.mawb, { cascade: true })
  accounting: Accounting;

  @OneToOne(() => Billing, (billing) => billing.mawb, { cascade: true })
  billing: Billing;

  @OneToMany(() => Dimension, (dim) => dim.mawb, { cascade: true })
  dimensions: Dimension[];

  @OneToMany(() => OtherCharge, (charge) => charge.mawb, { cascade: true })
  otherCharge: OtherCharge[];

  @OneToMany(() => NatureOfGoods, (nature) => nature.mawb, { cascade: true })
  natureOfGoods: NatureOfGoods[];

  @OneToMany(() => Hawb, (hawb) => hawb.mawb, { cascade: true })
  hawbs: Hawb[];
}