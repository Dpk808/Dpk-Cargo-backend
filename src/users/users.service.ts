import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>,
) {}
    async create(registerDto: RegisterDto): Promise<User> {
      const existing = await this.findByEmail(registerDto.email);
  
      if (existing) {
        throw new BadRequestException('User already exists');
      }
  
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
  
      const user = this.userRepo.create({
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        role: UserRole.USER,
        emailVerified: false,
        isActive: true,
      });
  
      return await this.userRepo.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
      return await this.userRepo.findOne({
        where: {
          email,
          deletedAt: IsNull(),
        },
        select: [
          'id',
          'email',
          'password',
          'firstName',
          'lastName',
          'role',
          'emailVerified',
          'isActive',
          'lastLoginAt',
        ],
      });
    }
    
    async findById(id: number): Promise<User | null> {
        return await this.userRepo.findOne({
          where: {
            id,
            deletedAt: IsNull(),
          },
        });
      }
      async updateLastLogin(id: number): Promise<void> {
        await this.userRepo.update(id, {
          lastLoginAt: new Date(),
        });
      }
      
      async softDelete(id: number): Promise<void> {
        await this.userRepo.softDelete(id);
      }
}
