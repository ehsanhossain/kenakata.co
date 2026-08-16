import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BANGLADESH_DIVISIONS } from '../../../common/constants';

export class CheckoutItemDto {
  @ApiProperty({ example: 'variant-uuid' })
  @IsString()
  @IsNotEmpty()
  variantId: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CheckoutQuoteDto {
  @ApiProperty({ enum: BANGLADESH_DIVISIONS, example: 'Dhaka' })
  @IsString()
  @IsNotEmpty()
  division: string;

  @ApiProperty({ type: [CheckoutItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];

  @ApiProperty({ required: false, example: 'KENA10' })
  @IsOptional()
  @IsString()
  couponCode?: string;
}

export class PlaceOrderDto {
  @ApiProperty({ example: 'Tanvir Hossain' })
  @IsString()
  @IsNotEmpty()
  recipientName: string;

  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: false, example: 'tanvir@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ enum: BANGLADESH_DIVISIONS, example: 'Dhaka' })
  @IsString()
  @IsNotEmpty()
  division: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ example: 'Dhanmondi' })
  @IsString()
  @IsNotEmpty()
  upazilaThana: string;

  @ApiProperty({ example: 'House 42, Apt 5B, Road 27' })
  @IsString()
  @IsNotEmpty()
  addressLine: string;

  @ApiProperty({ required: false, example: 'Near Rangs Plaza' })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiProperty({ required: false, example: 'Leave at front desk' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({ enum: ['CASH_ON_DELIVERY', 'BKASH', 'SSLCOMMERZ'], example: 'CASH_ON_DELIVERY' })
  @IsEnum(['CASH_ON_DELIVERY', 'BKASH', 'SSLCOMMERZ'])
  paymentMethod: 'CASH_ON_DELIVERY' | 'BKASH' | 'SSLCOMMERZ';

  @ApiProperty({ type: [CheckoutItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];

  @ApiProperty({ required: false, example: 'KENA10' })
  @IsOptional()
  @IsString()
  couponCode?: string;

  @ApiProperty({ required: false, example: 'guest-cart-token' })
  @IsOptional()
  @IsString()
  guestCartToken?: string;
}
