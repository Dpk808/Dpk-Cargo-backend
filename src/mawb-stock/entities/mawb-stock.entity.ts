import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Airline } from '../../airlines/entities/airline.entity';
import { Agent } from '../../agent/entities/agent.entity';

export enum MawbStockStatus {
  AVAILABLE = 'available',
  HELD = 'held',
  USED = 'used',
  INUSE = 'in_use',
}

@Entity({ name: 'mawb_stock' })
@Unique('uq_mawb_stock_serial', ['airline', 'airline_prefix', 'serial_no'])
export class MawbStock extends AppBaseEntity {
  @ManyToOne(() => Airline, { eager: true, nullable: false })
  @JoinColumn({ name: 'airline_id' })
  airline: Airline;

  @Column({ type: 'varchar', length: 5 })
  airline_prefix: string;

  @Column({ type: 'char', length: 7 })
  serial_no: string;

  @Column({ type: 'char', length: 1 })
  check_digit: string;

  @Column({
    type: 'enum',
    enum: MawbStockStatus,
    default: MawbStockStatus.AVAILABLE,
  })
  status: MawbStockStatus;

  @ManyToOne(() => Agent, { eager: true, nullable: true })
  @JoinColumn({ name: 'held_by_agent_id' })
  heldByAgent: Agent | null;

  @Column({ type: 'timestamp', nullable: true })
  held_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  used_at: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remarks: string | null;

  @Column({ type: 'timestamp', nullable: true })
  mawb_started_at: Date | null;

}
