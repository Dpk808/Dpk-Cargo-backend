
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateConsigneeDto {
    @ApiProperty({ description: 'Name of the consignee', example: 'Acme Corp' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
  
    @ApiProperty({ description: 'Email of the consignee', example: 'contact@acme.com', required: false })
    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    email?: string;
  
    @ApiProperty({ description: 'PO Box number of the consignee', example: '12345', required: false })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    poBoxNumber?: string;
  
    @ApiProperty({ description: 'Phone number of the consignee', example: '+1-234-567-8901', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    phoneNumber?: string;

    @ApiProperty({ description: 'Office number of the consignee', example: '+1-234-567-8901', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    officeNumber?: string;
  
    @ApiProperty({ description: 'Address of the consignee', example: '123 Main St, City, Country' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    address: string;
  
    @ApiProperty({ description: 'City of the consignee', example: 'New York' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    city: string;
  
    @ApiProperty({ description: 'Country of the consignee', example: 'USA' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    country: string;
  }