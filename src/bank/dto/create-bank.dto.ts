import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto {
  @ApiProperty({ description: 'Optional bank id', example: 1, required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ description: 'Bank name', example: 'National Bank' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  bankName: string;

  @ApiProperty({ description: 'Bank address', example: '123 Finance St' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  bankAddress: string;

  @ApiProperty({ description: 'Bank city', example: 'Kathmandu' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  bankCity: string;

  @ApiProperty({ description: 'Bank country', example: 'Nepal' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  bankCountry: string;

  @ApiProperty({ description: 'Bank zip code', example: '44600', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  bankZipCode?: string;

  @ApiProperty({ description: 'Bank phone number', example: '+977-1-1234567', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  bankPhoneNumber?: string;

  @ApiProperty({ description: 'Bank email', example: 'info@bank.com', required: false })
  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  bankEmail?: string;

  @ApiProperty({ description: 'IFSC code', example: 'IFSC123', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  bankIfscCode?: string;

  @ApiProperty({ description: 'Bank account number', example: '1234567890' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  bankAccountNumber: string;

  @ApiProperty({ description: 'Fax number', example: '', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  faxNo?: string;

  @ApiProperty({ description: 'Telex', example: '', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  telex?: string;

  @ApiProperty({ description: 'SWIFT code', example: 'SWFT123', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  swift?: string;

  @ApiProperty({ description: 'Account holder name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  bankAccHolderName: string;

  @ApiProperty({ description: 'Bank branch', example: 'Main Branch' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  bankBranch: string;

  @ApiProperty({ description: 'Is USD account', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isUsd?: boolean;
}

