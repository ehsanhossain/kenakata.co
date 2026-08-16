import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MerchantStatus } from '@prisma/client';

export class AdminMerchantFilterDto {
  @ApiPropertyOptional({ enum: ['PENDING_ONBOARDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED'] })
  @IsOptional()
  status?: MerchantStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;
}

export class ApproveMerchantDto {
  @ApiPropertyOptional({ example: 5.0 })
  @IsOptional()
  @IsNumber()
  commissionRate?: number;

  @ApiPropertyOptional({ example: 'Verified all documents and trade license.' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class RejectMerchantDto {
  @ApiProperty({ example: 'Trade License expired on Dec 2025. Please upload valid 2026-2027 renewal copy.' })
  @IsString()
  @IsNotEmpty()
  rejectionReason: string;
}

export class RejectKycDocDto {
  @ApiProperty({ example: 'NID image is blurry. Please upload a clear photo.' })
  @IsString()
  @IsNotEmpty()
  rejectionReason: string;
}

export class RejectProductDto {
  @ApiProperty({ example: 'Product images do not meet resolution requirements.' })
  @IsString()
  @IsNotEmpty()
  rejectionReason: string;
}
