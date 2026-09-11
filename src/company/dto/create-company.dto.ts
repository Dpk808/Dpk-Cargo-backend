import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name', example: 'My Company' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Company alias', example: 'MC' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  alias: string;

  @ApiProperty({ description: 'Logo URL', example: 'https://example.com/logo.png', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  logo?: string;

  @ApiProperty({ description: 'PO Box number', example: '12345' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  poBoxNumber: string;

  @ApiProperty({ description: 'Phone number', example: '+1-234-567-8901', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  phoneNumber?: string;

  @ApiProperty({ description: 'Address', example: '123 Main St, City, Country' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @ApiProperty({ description: 'City', example: 'Kathmandu' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @ApiProperty({ description: 'Country', example: 'Nepal' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country: string;

  @ApiProperty({ description: 'Office number 1', example: '+977-1-1234567', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  officeNumber1?: string;

  @ApiProperty({ description: 'Office number 2', example: '+977-1-7654321', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  officeNumber2?: string;

  @ApiProperty({ description: 'Office number 3', example: '', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  officeNumber3?: string;

  @ApiProperty({ description: 'Company email', example: 'info@company.com', required: false })
  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  email?: string;

  @ApiProperty({ description: 'Is VAT enabled', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isVat?: boolean;

  @ApiProperty({ description: 'VAT/PAN number', example: 'PAN12345' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  vatPanNumber: string;
}



