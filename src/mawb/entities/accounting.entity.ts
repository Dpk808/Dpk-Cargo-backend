import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Mawb } from './mawb.entity';

@Entity({ schema: 'mawb', name: 'accounting' })
export class Accounting extends AppBaseEntity {
  @Column({ type: 'boolean', default: false })
  is_prepaid: boolean;

  @Column({ type: 'boolean', default: false })
  is_collect: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  reference_number: string | null;

  @Column({ type: 'char', length: 3 })
  currency: string;

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

  @OneToOne(() => Mawb, (mawb) => mawb.accounting)
  @JoinColumn()
  mawb: Mawb;
}