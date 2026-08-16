import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentIntentDto {
  @ApiProperty({ example: 'order-uuid' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ enum: ['BKASH', 'SSLCOMMERZ', 'CASH_ON_DELIVERY'], example: 'BKASH' })
  @IsEnum(['BKASH', 'SSLCOMMERZ', 'CASH_ON_DELIVERY'])
  method: 'BKASH' | 'SSLCOMMERZ' | 'CASH_ON_DELIVERY';
}

export class VerifyPaymentDto {
  @ApiProperty({ example: 'payment-attempt-key' })
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty({ required: false, example: 'TXN12345678' })
  @IsOptional()
  @IsString()
  trxID?: string;

  @ApiProperty({ required: false, example: 'val_id_123' })
  @IsOptional()
  @IsString()
  val_id?: string;
}
