import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RequestOtpDto, VerifyOtpDto, AdminLoginDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp/request')
  @ApiOperation({ summary: 'Request OTP for customer login or registration via SMS' })
  async requestOtp(@Body() dto: RequestOtpDto) {
    return this.authService.requestCustomerOtp(dto);
  }

  @Post('otp/verify')
  @ApiOperation({ summary: 'Verify OTP and receive customer access and refresh tokens' })
  async verifyOtp(@Body() dto: VerifyOtpDto, @Req() req: Request) {
    const clientMeta = {
      userAgent: req.headers['user-agent'],
      ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
    };
    return this.authService.verifyCustomerOtp(dto, clientMeta);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login with email and password' })
  async adminLogin(@Body() dto: AdminLoginDto) {
    return this.authService.adminLogin(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh expired access token using refresh token' })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshCustomerToken(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  async me(@CurrentUser() user: any) {
    return user;
  }
}
