import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Mawb } from './mawb.entity';

@Entity({ name: 'billing', schema: 'mawb' })
export class Billing extends AppBaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  weight_charge: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valuation_charge: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tax: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_charge_agent: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_charge_carrier: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'date' })
  executed_date: Date;

  @Column({ type: 'varchar', length: 100 })
  place: string;

  @OneToOne(() => Mawb, (mawb) => mawb.billing)
  @JoinColumn()
  mawb: Mawb;
}
