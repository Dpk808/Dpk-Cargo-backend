

import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateShipperDto {
    @ApiProperty({ description: 'Name of the shipper', example: 'Acme Corp' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
  
    @ApiProperty({ description: 'Email of the shipper', example: 'contact@acme.com', required: false })
    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    email?: string;
  
    @ApiProperty({ description: 'PO Box number of the shipper', example: '12345' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    poBoxNumber: string;
  
    @ApiProperty({ description: 'Phone number of the shipper', example: '+1-234-567-8901', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    phoneNumber?: string;

    @ApiProperty({ description: 'Office number of the shipper', example: '+1-234-567-8901', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    officeNumber?: string;
  
    @ApiProperty({ description: 'Address of the shipper', example: '123 Main St, City, Country' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    address: string;
  
    @ApiProperty({ description: 'City of the shipper', example: 'New York' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    city: string;
  
    @ApiProperty({ description: 'Country of the shipper', example: 'USA' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    country: string;
  }