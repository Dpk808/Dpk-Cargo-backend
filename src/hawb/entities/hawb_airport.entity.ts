import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Hawb } from './hawb.entity';

@Entity({ schema: 'hawb', name: 'hawb_airport' })
export class HawbAirport extends AppBaseEntity {
  @Column({ type: 'varchar', length: 50 })
  departure: string;

  @Column({ type: 'varchar', length: 50 })
  destination: string;

  @Column({ type: 'char', length: 3 })
  to: string;

  @Column({ type: 'char', length: 2 })
  by_first_carrier: string;

  @Column({ type: 'char', length: 3, nullable: true })
  second_to: string | null;

  @Column({ type: 'char', length: 2, nullable: true })
  second_by: string | null;

  @Column({ type: 'char', length: 3, nullable: true })
  third_to: string | null;

  @Column({ type: 'char', length: 2, nullable: true })
  third_by: string | null;

  @Column({ type: 'date' })
  flight_date: Date;

  @OneToOne(() => Hawb, (hawb) => hawb.agent)
  @JoinColumn()
  hawb: Hawb;
}