import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email of the user', example: 'ava@gmail.com' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ description: 'Password for the account', example: 'Hello@123' })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}