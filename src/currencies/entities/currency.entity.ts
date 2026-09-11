import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 3,
  })
  code: string;

  @Column({
    name: 'code_numeric',
    type: 'int',
    nullable: true,
  })
  codeNumeric?: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  currency: string;
}