import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MerchantRegisterDto {
  @ApiProperty({ example: 'dhaka.electronics@kenakata.co' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Tanvir Hossain' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Dhaka Tech Hub' })
  @IsString()
  @IsNotEmpty()
  shopName: string;

  @ApiProperty({ example: 'Shop@123456' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class MerchantLoginDto {
  @ApiProperty({ example: 'dhaka.electronics@kenakata.co' })
  @IsString()
  @IsNotEmpty()
  emailOrPhone: string;

  @ApiProperty({ example: 'Shop@123456' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class MerchantRefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
