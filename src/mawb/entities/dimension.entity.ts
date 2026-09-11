import { Entity, Column, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Mawb } from './mawb.entity';

@Entity({ schema: 'mawb', name: 'dimension' })
export class Dimension extends AppBaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  length: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  width: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  height: number;

  @ManyToOne(() => Mawb, (mawb) => mawb.dimensions)
  mawb: Mawb;
}