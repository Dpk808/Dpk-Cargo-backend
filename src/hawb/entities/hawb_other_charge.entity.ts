import { Column, Entity, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Hawb } from './hawb.entity';

export enum ChargeType {
  AGENT = 'AGENT',
  CARRIER = 'CARRIER',
}

@Entity({ name: 'other_charge', schema: 'hawb' })
export class HawbOtherCharge extends AppBaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ChargeType })
  type: ChargeType;

  @ManyToOne(() => Hawb, (hawb) => hawb.otherCharge)
  hawb: Hawb;
}