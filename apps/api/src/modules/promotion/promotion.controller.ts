import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PromotionService } from './promotion.service';
import { ApplyCouponDto, CreateCouponDto } from './dto/promotion.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('Promotions & Coupons')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post('coupons/apply')
  @ApiOperation({ summary: 'Validate and calculate discount for a coupon code' })
  async applyCoupon(@Body() dto: ApplyCouponDto) {
    return this.promotionService.applyCoupon(dto);
  }

  @Get('admin/coupons')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all promotional coupons (Admin)' })
  async listCoupons() {
    return this.promotionService.listCoupons();
  }

  @Post('admin/coupons')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new coupon code (Admin)' })
  async createCoupon(@Body() dto: CreateCouponDto) {
    return this.promotionService.createCoupon(dto);
  }
}
