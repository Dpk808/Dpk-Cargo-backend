import { AppBaseEntity } from '../../common/entities/base.entity';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity({ schema: 'user', name: 'users' })
export class User extends AppBaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  firstName?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    default: false,
  })
  emailVerified: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  lastLoginAt?: Date;
}