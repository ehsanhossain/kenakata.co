import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MerchantAuthService } from './merchant-auth.service';
import { MerchantRegisterDto, MerchantLoginDto } from './dto/merchant-auth.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Merchant Auth')
@Controller('auth/merchant')
export class MerchantAuthController {
  constructor(private readonly authService: MerchantAuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new store owner/merchant and create shop' })
  async register(@Body() dto: MerchantRegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Merchant login with email/phone and password' })
  async login(@Body() dto: MerchantLoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get currently authenticated merchant and shop details' })
  async me(@CurrentUser() user: any) {
    return this.authService.getProfile(user.id);
  }
}
