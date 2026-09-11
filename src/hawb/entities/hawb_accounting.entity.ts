import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Hawb } from './hawb.entity';

@Entity({ schema: 'hawb', name: 'hawb_accounting' })
export class HawbAccounting extends AppBaseEntity {
  @Column({ type: 'boolean', default: false })
  is_prepaid: boolean;

  @Column({ type: 'boolean', default: false })
  is_collect: boolean;

  @Column({ type: 'char', length: 2 })
  chgs_code: string;

  @Column({ type: 'boolean', default: false })
  wt_val_ppd: boolean;

  @Column({ type: 'boolean', default: false })
  wt_val_coll: boolean;

  @Column({ type: 'boolean', default: false })
  other_ppd: boolean;

  @Column({ type: 'boolean', default: false })
  other_coll: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  declared_value_carriage: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  declared_value_customs: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  insurance_amt: number | null;

  @OneToOne(() => Hawb, (hawb) => hawb.accounting)
  @JoinColumn()
  hawb: Hawb;
}