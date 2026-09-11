import {
    IsEmail,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class RegisterDto {
    @ApiProperty({ description: 'Email of the user', example: 'user@example.com' })
    @IsEmail()
    @MaxLength(100)
    email: string;
  
    @ApiProperty({ description: 'Password for the account', example: 'strongPassword123' })
    @IsString()
    @MinLength(6)
    @MaxLength(255)
    password: string;
  
    @ApiProperty({ description: 'First name of the user', example: 'John', required: false })
    // @IsOptional()
    @IsString()
    @MaxLength(50)
    firstName?: string;
  
    @ApiProperty({ description: 'Last name of the user', example: 'Doe', required: false })
    // @IsOptional()
    @IsString()
    @MaxLength(50)
    lastName?: string;
  }