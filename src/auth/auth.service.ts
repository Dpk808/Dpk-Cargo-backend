import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { UsersService } from '../users/users.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}
  
    async register(registerDto: RegisterDto) {
      const user = await this.usersService.create(registerDto);
  
      return {
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    }
  
    async login(loginDto: LoginDto) {
      const user = await this.usersService.findByEmail(loginDto.email);
  
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      if (!user.isActive) {
        throw new UnauthorizedException('Account is disabled');
      }
  
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      await this.usersService.updateLastLogin(user.id);
  
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
  
      return {
        message: 'Login successful',
        access_token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    }
  }