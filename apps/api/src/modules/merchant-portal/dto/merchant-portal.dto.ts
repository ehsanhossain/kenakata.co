import { IsNotEmpty, IsOptional, IsString, IsNumber, IsArray, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMerchantProductDto {
  @ApiProperty({ example: 'Samsung Galaxy Watch 6 (44mm Bluetooth)' })
  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @ApiPropertyOptional({ example: 'স্যামসাং গ্যালাক্সি ওয়াচ ৬' })
  @IsOptional()
  @IsString()
  titleBn?: string;

  @ApiProperty({ example: 'smartphones' })
  @IsString()
  @IsNotEmpty()
  categorySlug: string;

  @ApiPropertyOptional({ example: 'samsung' })
  @IsOptional()
  @IsString()
  brandSlug?: string;

  @ApiProperty({ example: 28500 })
  @IsNumber()
  @Min(1)
  priceBDT: number;

  @ApiPropertyOptional({ example: 32000 })
  @IsOptional()
  @IsNumber()
  compareAtBDT?: number;

  @ApiProperty({ example: 15 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({ example: 'SAM-W6-44' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ example: 'Super AMOLED sapphire crystal display with ECG and body composition monitor.' })
  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class RequestPayoutDto {
  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(500)
  amountBDT: number;

  @ApiPropertyOptional({ example: 'BANK_TRANSFER' })
  @IsOptional()
  @IsString()
  paymentMethod?: string;
}
