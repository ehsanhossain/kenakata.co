import { IsString, IsNotEmpty, Matches, IsOptional, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtpDto {
  @ApiProperty({ example: '+8801712345678', description: 'Bangladesh phone number in E.164 format (+8801...)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+8801[3-9]\d{8}$/, {
    message: 'Phone number must be a valid Bangladesh mobile number in E.164 format (e.g. +8801712345678)',
  })
  phone: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+8801[3-9]\d{8}$/)
  phone: string;

  @ApiProperty({ example: '123456', description: '6-digit OTP code' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 6)
  code: string;

  @ApiProperty({ required: false, example: 'guest-cart-token-123', description: 'Optional guest cart token to merge upon login' })
  @IsOptional()
  @IsString()
  guestCartToken?: string;
}

export class AdminLoginDto {
  @ApiProperty({ example: 'admin@kenakata.co' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Admin@123456' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false, example: '123456' })
  @IsOptional()
  @IsString()
  totpCode?: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
