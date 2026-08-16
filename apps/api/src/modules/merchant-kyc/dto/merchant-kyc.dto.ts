import { IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessEntityType, KycDocumentType } from '@prisma/client';

export class Step1EntityDetailsDto {
  @ApiProperty({ enum: ['SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'PRIVATE_LIMITED', 'INDIVIDUAL'] })
  @IsEnum(['SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'PRIVATE_LIMITED', 'INDIVIDUAL'])
  entityType: BusinessEntityType;

  @ApiPropertyOptional({ example: 'TL-DHK-2024-9812' })
  @IsOptional()
  @IsString()
  tradeLicenseNo?: string;

  @ApiPropertyOptional({ example: '2027-06-30' })
  @IsOptional()
  @IsString()
  tradeLicenseExpiry?: string;

  @ApiPropertyOptional({ example: '123456789012' })
  @IsOptional()
  @IsString()
  tinNo?: string;

  @ApiPropertyOptional({ example: '987654321098' })
  @IsOptional()
  @IsString()
  binNo?: string;

  @ApiPropertyOptional({ example: '19902692812345678' })
  @IsOptional()
  @IsString()
  nidNo?: string;

  @ApiPropertyOptional({ example: 'Dhaka' })
  @IsOptional()
  @IsString()
  division?: string;

  @ApiPropertyOptional({ example: 'Dhaka' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ example: 'Motijheel' })
  @IsOptional()
  @IsString()
  upazila?: string;

  @ApiPropertyOptional({ example: 'Level 4, BCS Computer City, Dhaka 1205' })
  @IsOptional()
  @IsString()
  fullAddress?: string;
}

export class UploadKycDocDto {
  @ApiProperty({ enum: ['TRADE_LICENSE', 'NID_FRONT', 'NID_BACK', 'TIN_CERTIFICATE', 'BIN_CERTIFICATE', 'BANK_CHEQUE', 'UTILITY_BILL', 'AUTHORIZATION_LETTER'] })
  @IsEnum(['TRADE_LICENSE', 'NID_FRONT', 'NID_BACK', 'TIN_CERTIFICATE', 'BIN_CERTIFICATE', 'BANK_CHEQUE', 'UTILITY_BILL', 'AUTHORIZATION_LETTER'])
  documentType: KycDocumentType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  documentNumber?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800' })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fileSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mimeType?: string;
}

export class Step3BankDetailsDto {
  @ApiProperty({ example: 'BANK_ACCOUNT' })
  @IsString()
  accountType: 'BANK_ACCOUNT' | 'BKASH_MERCHANT' | 'NAGAD_MERCHANT' | 'ROCKET_MERCHANT';

  @ApiPropertyOptional({ example: 'BRAC Bank PLC' })
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiPropertyOptional({ example: 'Gulshan Branch' })
  @IsOptional()
  @IsString()
  branchName?: string;

  @ApiPropertyOptional({ example: '060261234' })
  @IsOptional()
  @IsString()
  routingNumber?: string;

  @ApiPropertyOptional({ example: 'Dhaka Tech Hub Ltd' })
  @IsOptional()
  @IsString()
  accountHolderName?: string;

  @ApiPropertyOptional({ example: '1501203456789001' })
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  mfsNumber?: string;
}
