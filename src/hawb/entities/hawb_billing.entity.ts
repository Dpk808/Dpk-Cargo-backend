import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Hawb } from './hawb.entity';

@Entity({ name: 'billing', schema: 'hawb' })
export class HawbBilling extends AppBaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  weight_charge: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valuation_charge: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tax: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_charge_agent: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_charge_carrier: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  signature: string | null;

  @Column({ type: 'date' })
  executed_date: Date;

  @Column({ type: 'varchar', length: 100 })
  place: string;

  @OneToOne(() => Hawb, (hawb) => hawb.billing)
  @JoinColumn()
  hawb: Hawb;
}