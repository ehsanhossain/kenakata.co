import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MerchantKycService } from './merchant-kyc.service';
import { Step1EntityDetailsDto, UploadKycDocDto, Step3BankDetailsDto } from './dto/merchant-kyc.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Merchant KYC & Onboarding')
@Controller('merchant/onboarding')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MerchantKycController {
  constructor(private readonly kycService: MerchantKycService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get current merchant onboarding progress and KYC verification status' })
  async getStatus(@CurrentUser() user: any) {
    return this.kycService.getOnboardingStatus(user.id);
  }

  @Post('step1-entity')
  @ApiOperation({ summary: 'Step 1: Save store legal entity, trade license, and business address' })
  async saveEntity(@CurrentUser() user: any, @Body() dto: Step1EntityDetailsDto) {
    return this.kycService.saveEntityDetails(user.id, dto);
  }

  @Post('step2-kyc-upload')
  @ApiOperation({ summary: 'Step 2: Upload and register a KYC verification document' })
  async uploadDoc(@CurrentUser() user: any, @Body() dto: UploadKycDocDto) {
    return this.kycService.uploadKycDocument(user.id, dto);
  }

  @Post('step3-bank')
  @ApiOperation({ summary: 'Step 3: Save bank account or merchant MFS for payout settlement' })
  async saveBank(@CurrentUser() user: any, @Body() dto: Step3BankDetailsDto) {
    return this.kycService.saveBankDetails(user.id, dto);
  }

  @Post('submit-review')
  @ApiOperation({ summary: 'Step 4: Submit complete KYC application for Kenakata Compliance review' })
  async submitReview(@CurrentUser() user: any) {
    return this.kycService.submitForReview(user.id);
  }
}
