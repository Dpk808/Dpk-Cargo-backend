import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({
    description: 'Name of the agent',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty
({
    description: 'Alias of the agent',
    example: 'JD',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  alias?: string;

  @ApiProperty({
    description: 'IATA code of the agent',
    example: 'ABC',
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  IATA_code?: string;

  @ApiProperty({
    description: 'Email of the agent',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  email?: string;

  @ApiProperty({
    description: 'PO Box number of the agent',
    example: '12345',
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  poBoxNumber?: string;

  @ApiProperty({
    description: 'Phone number of the agent',
    example: '+1-234-567-8901',
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

  @ApiProperty({
    description: 'Office number of the agent',
    example: '+1-234-567-8901',
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  officeNumber?: string;

  @ApiProperty({
    description: 'Address of the agent',
    example: '123 Main St, City, Country',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    description: 'City of the agent',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  city: string;

  @ApiProperty({
    description: 'Country of the agent',
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  country: string;
}
