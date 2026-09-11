import { Column, Entity, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Hawb } from './hawb.entity';

@Entity({ schema: 'hawb', name: 'hawb_dimension' })
export class HawbDimension extends AppBaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  length: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  width: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  height: number;

  @ManyToOne(() => Hawb, (hawb) => hawb.dimensions)
  hawb: Hawb;
}