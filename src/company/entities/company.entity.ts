import { AppBaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from "typeorm";
import { CompanyBank } from '../../bank/entities/bank.entity';


@Entity({ schema: 'common', name: 'company' })
export class Company extends AppBaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  alias: string;

  @Column({
    name: 'po_box_number',
    length: 50,
  })
  poBoxNumber: string;

  @Column({
    name: 'phone_number',
    length: 50,
    nullable: true
  })
  phoneNumber?: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  country: string;

  @Column({
    name: 'office_number_1',
    length: 50,
    nullable: true
  })
  officeNumber1?: string;

  @Column({
    name: 'office_number_2',
    length: 50,
    nullable: true
  })
  officeNumber2?: string;

  @Column({
    name: 'office_number_3',
    length: 50,
    nullable: true
  })
  officeNumber3?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  email?: string;

  @Column({
    name: 'is_vat',
    type: 'boolean',
    default: false
  })
  isVat: boolean;

  @Column({
    name: 'vat_pan_number',
    type: 'varchar',
    length: 50,
  })
  vatPanNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  logo?: string;

  @OneToMany(() => CompanyBank, (bank) => bank.company, { eager: true })
  banks: CompanyBank[];
}

