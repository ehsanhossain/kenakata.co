import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TrackOrderDto {
  @ApiProperty({ example: 'KK-2026-89412' })
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    enum: [
      'CONFIRMED',
      'PROCESSING',
      'READY_TO_SHIP',
      'HANDED_TO_COURIER',
      'IN_TRANSIT',
      'DELIVERED',
      'CANCELLED',
      'RETURNED',
    ],
    example: 'PROCESSING',
  })
  @IsEnum([
    'CONFIRMED',
    'PROCESSING',
    'READY_TO_SHIP',
    'HANDED_TO_COURIER',
    'IN_TRANSIT',
    'DELIVERED',
    'CANCELLED',
    'RETURNED',
  ])
  status: any;

  @ApiProperty({ required: false, example: 'Order confirmed and sent to warehouse for packaging' })
  @IsOptional()
  @IsString()
  note?: string;
}

export class OrderFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;

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
}
