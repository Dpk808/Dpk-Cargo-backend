import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('airlines')
export class Airline {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'iata_code',
    type: 'varchar',
    length: 5,
  })
  iataCode: string;

  @Column({
    name: 'prefix_code',
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  prefixCode?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  country?: string;
}
