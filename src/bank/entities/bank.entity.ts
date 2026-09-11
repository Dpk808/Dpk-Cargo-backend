import { AppBaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity({ schema: 'common', name: 'company_bank' })
export class CompanyBank extends AppBaseEntity {
  @Column({ name: 'bank_name', type: 'varchar', length: 100 })
  bankName: string;

  @Column({ name: 'bank_address', type: 'varchar', length: 255 })
  bankAddress: string;

  @Column({ name: 'bank_city', type: 'varchar', length: 100 })
  bankCity: string;

  @Column({ name: 'bank_country', type: 'varchar', length: 100 })
  bankCountry: string;

  @Column({ name: 'bank_zip_code', type: 'varchar', length: 20, nullable: true })
  bankZipCode?: string;

  @Column({ name: 'bank_phone_number', type: 'varchar', length: 50, nullable: true })
  bankPhoneNumber?: string;

  @Column({ name: 'bank_email', type: 'varchar', length: 100, nullable: true })
  bankEmail?: string;

  @Column({ name: 'bank_ifsc_code', type: 'varchar', length: 20, nullable: true })
  bankIfscCode?: string;

  @Column({ name: 'bank_account_number', type: 'varchar', length: 50 })
  bankAccountNumber: string;

  @Column({ name: 'fax_no', type: 'varchar', length: 50, nullable: true })
  faxNo?: string;

  @Column({ name: 'telex', type: 'varchar', length: 50, nullable: true })
  telex?: string;

  @Column({ name: 'swift', type: 'varchar', length: 20, nullable: true })
  swift?: string;

  @Column({ name: 'bank_account_holder_name', type: 'varchar', length: 100 })
  bankAccHolderName: string;

  @Column({ name: 'bank_branch', type: 'varchar', length: 100 })
  bankBranch: string;

  @Column({ name: 'is_usd', type: 'boolean', default: false })
  isUsd: boolean;

  @ManyToOne(() => Company, (company) => company.banks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
