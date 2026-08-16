import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsEnum, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @ApiProperty({ required: false, example: 100000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxPrice?: number;

  @ApiProperty({ required: false, enum: ['featured', 'newest', 'price_asc', 'price_desc', 'rating', 'popular'] })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @ApiProperty({ required: false, enum: ['EN_BD', 'BN_BD'], default: 'EN_BD' })
  @IsOptional()
  @IsString()
  locale?: 'EN_BD' | 'BN_BD' = 'EN_BD';
}

export class CreateCategoryDto {
  @ApiProperty({ example: 'electronics' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ example: 'Electronics' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ example: 'ইলেকট্রনিক্স' })
  @IsString()
  @IsNotEmpty()
  nameBn: string;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}

export class CreateBrandDto {
  @ApiProperty({ example: 'samsung' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Samsung' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ example: 'স্যামসাং' })
  @IsString()
  @IsNotEmpty()
  nameBn: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mediaKey?: string;
}

export class CreateProductVariantDto {
  @ApiProperty({ example: 'SAM-A55-128-BLK' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: '8GB / 128GB - Awesome Black' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: { Color: 'Awesome Black', Storage: '128GB', RAM: '8GB' } })
  optionValues: Record<string, string>;

  @ApiProperty({ example: 4599900, description: 'Price in minor poisha (e.g. 45999.00 Tk = 4599900 poisha)' })
  @IsInt()
  priceMinor: number;

  @ApiProperty({ required: false, example: 4999900 })
  @IsOptional()
  @IsInt()
  compareAtMinor?: number;

  @ApiProperty({ required: false, example: 25 })
  @IsOptional()
  @IsInt()
  initialStock?: number;
}

export class CreateProductDto {
  @ApiProperty({ example: 'samsung-galaxy-a55-5g' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'category-uuid' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ required: false, example: 'brand-uuid' })
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiProperty({ example: 'Samsung Galaxy A55 5G' })
  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @ApiProperty({ example: 'স্যামসাং গ্যালাক্সি এ৫৫ ৫জি' })
  @IsString()
  @IsNotEmpty()
  titleBn: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  shortDescriptionEn?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  shortDescriptionBn?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descriptionBn?: string;

  @ApiProperty({ required: false, default: 'STANDARD_7_DAY' })
  @IsOptional()
  @IsString()
  returnPolicyCode?: string = 'STANDARD_7_DAY';

  @ApiProperty({ required: false, default: 'STANDARD_VAT_15' })
  @IsOptional()
  @IsString()
  taxClassCode?: string = 'STANDARD_VAT_15';

  @ApiProperty({ required: false, example: ['https://images.unsplash.com/...'] })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ type: [CreateProductVariantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[];
}
