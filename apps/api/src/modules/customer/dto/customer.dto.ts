import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BANGLADESH_DIVISIONS } from '@/common/constants';

export class UpdateProfileDto {
  @ApiProperty({ required: false, example: 'Tanvir Hossain' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: 'tanvir@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, enum: ['EN_BD', 'BN_BD'], example: 'EN_BD' })
  @IsOptional()
  @IsIn(['EN_BD', 'BN_BD'])
  locale?: 'EN_BD' | 'BN_BD';
}

export class CreateAddressDto {
  @ApiProperty({ required: false, example: 'Home' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ example: 'Tanvir Hossain' })
  @IsString()
  @IsNotEmpty()
  recipientName: string;

  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ enum: BANGLADESH_DIVISIONS, example: 'Dhaka' })
  @IsString()
  @IsNotEmpty()
  @IsIn(BANGLADESH_DIVISIONS as unknown as string[])
  division: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ example: 'Dhanmondi' })
  @IsString()
  @IsNotEmpty()
  upazilaThana: string;

  @ApiProperty({ required: false, example: 'Road 27, Block A' })
  @IsOptional()
  @IsString()
  area?: string;

  @ApiProperty({ required: false, example: '1209' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({ example: 'House 42, Apt 5B, Road 27' })
  @IsString()
  @IsNotEmpty()
  addressLine: string;

  @ApiProperty({ required: false, example: 'Near Rangs Plaza' })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiProperty({ required: false, example: 'Call before arriving' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateAddressDto extends CreateAddressDto {}
