import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MerchantPortalService } from './merchant-portal.service';
import { CreateMerchantProductDto, RequestPayoutDto } from './dto/merchant-portal.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Merchant Portal & Store Ops')
@Controller('merchant')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MerchantPortalController {
  constructor(private readonly portalService: MerchantPortalService) {}

  @Get('dashboard/summary')
  @ApiOperation({ summary: 'Get merchant dashboard statistics, sales, and balance' })
  async getSummary(@CurrentUser() user: any) {
    return this.portalService.getDashboardStats(user.id);
  }

  @Get('products')
  @ApiOperation({ summary: 'List all products registered by this merchant' })
  async getProducts(@CurrentUser() user: any) {
    return this.portalService.listProducts(user.id);
  }

  @Post('products')
  @ApiOperation({ summary: 'Create and submit a new product for admin approval' })
  async createProduct(@CurrentUser() user: any, @Body() dto: CreateMerchantProductDto) {
    return this.portalService.createProduct(user.id, dto);
  }

  @Get('payouts')
  @ApiOperation({ summary: 'List payout requests and transaction history' })
  async getPayouts(@CurrentUser() user: any) {
    return this.portalService.listPayouts(user.id);
  }

  @Post('payouts/request')
  @ApiOperation({ summary: 'Request revenue withdrawal payout to registered bank account' })
  async requestPayout(@CurrentUser() user: any, @Body() dto: RequestPayoutDto) {
    return this.portalService.requestPayout(user.id, dto);
  }
}
