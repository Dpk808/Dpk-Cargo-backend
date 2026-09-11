import { Column, Entity, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Mawb } from './mawb.entity';

export enum ChargeType {
  AGENT = 'AGENT',
  CARRIER = 'CARRIER',
}

@Entity({ name: 'other_charge', schema: 'mawb' })
export class OtherCharge extends AppBaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ChargeType })
  type: ChargeType;

  @ManyToOne(() => Mawb, (mawb) => mawb.otherCharge)
  mawb: Mawb;
}