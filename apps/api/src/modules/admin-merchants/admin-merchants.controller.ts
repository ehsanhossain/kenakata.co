import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminMerchantsService } from './admin-merchants.service';
import { AdminMerchantFilterDto, ApproveMerchantDto, RejectMerchantDto, RejectKycDocDto, RejectProductDto } from './dto/admin-merchants.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Admin Merchants & KYC Approvals')
@Controller('admin/merchants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminMerchantsController {
  constructor(private readonly merchantsService: AdminMerchantsService) {}

  @Get()
  @ApiOperation({ summary: 'List all registered merchants with KYC verification status' })
  async listMerchants(@Query() filter: AdminMerchantFilterDto) {
    return this.merchantsService.listMerchants(filter);
  }

  @Get('products/approvals')
  @ApiOperation({ summary: 'List all vendor products pending admin approval' })
  async listPendingProducts(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.merchantsService.listPendingProducts({ page, limit });
  }

  @Post('products/:id/approve')
  @ApiOperation({ summary: 'Approve vendor product to go live on storefront' })
  async approveProduct(@Param('id') id: string, @CurrentUser() user: any) {
    return this.merchantsService.approveProduct(id, user);
  }

  @Post('products/:id/reject')
  @ApiOperation({ summary: 'Reject vendor product with revision feedback' })
  async rejectProduct(@Param('id') id: string, @Body() dto: RejectProductDto, @CurrentUser() user: any) {
    return this.merchantsService.rejectProduct(id, dto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get full merchant profile, shop details, and KYC documents' })
  async getDetails(@Param('id') id: string) {
    return this.merchantsService.getMerchantDetails(id);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve and activate merchant store with commission rate' })
  async approveMerchant(@Param('id') id: string, @Body() dto: ApproveMerchantDto, @CurrentUser() user: any) {
    return this.merchantsService.approveMerchant(id, dto, user);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject or request resubmission for merchant KYC application' })
  async rejectMerchant(@Param('id') id: string, @Body() dto: RejectMerchantDto, @CurrentUser() user: any) {
    return this.merchantsService.rejectMerchant(id, dto, user);
  }

  @Post('kyc-docs/:docId/verify')
  @ApiOperation({ summary: 'Verify individual KYC document' })
  async verifyDoc(@Param('docId') docId: string, @CurrentUser() user: any) {
    return this.merchantsService.verifyKycDoc(docId, user);
  }

  @Post('kyc-docs/:docId/reject')
  @ApiOperation({ summary: 'Reject individual KYC document with reason' })
  async rejectDoc(@Param('docId') docId: string, @Body() dto: RejectKycDocDto, @CurrentUser() user: any) {
    return this.merchantsService.rejectKycDoc(docId, dto, user);
  }
}
