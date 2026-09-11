import { Mawb } from '../../mawb/entities/mawb.entity';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ schema: 'common', name: 'consignee' })
export class Consignee extends AppBaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: true,
  })
  email?: string;

  @Column({ 
    name: 'po_box_number', 
    length: 20, 
    // nullable: true
 })
poBoxNumber: string;

@Column({ 
     name: 'phone_number',
     length: 20,
     nullable: true
    })
  phoneNumber?: string;

  @Column({ 
    name: 'office_number',
    length: 20,
    nullable: true
   })
   officeNumber?: string;
   
  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  country: string;
  
  @OneToMany(() => Mawb, (mawb) => mawb.consignee)
  mawbs: Mawb[];
}

