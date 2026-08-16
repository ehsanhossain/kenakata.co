import { IsString, IsNotEmpty, IsInt, Min, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyCouponDto {
  @ApiProperty({ example: 'KENA10', description: 'Coupon code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 450000, description: 'Current subtotal in poisha minor units' })
  @IsInt()
  @Min(0)
  subtotalMinor: number;
}

export class CreateCouponDto {
  @ApiProperty({ example: 'EID2026' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Eid Special 15% Off' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING'], example: 'PERCENTAGE' })
  @IsEnum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING'])
  discountKind: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';

  @ApiProperty({ example: 15, description: 'Percentage discount (e.g. 15) or amount in minor poisha' })
  @IsInt()
  @Min(1)
  value: number;

  @ApiProperty({ required: false, example: 50000, description: 'Minimum order subtotal in minor poisha' })
  @IsOptional()
  @IsInt()
  minOrderMinor?: number;

  @ApiProperty({ required: false, example: 100000, description: 'Maximum discount cap in minor poisha' })
  @IsOptional()
  @IsInt()
  maxDiscountMinor?: number;
}
