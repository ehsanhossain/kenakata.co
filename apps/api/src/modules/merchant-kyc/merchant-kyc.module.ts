import { Module } from '@nestjs/common';
import { MerchantKycController } from './merchant-kyc.controller';
import { MerchantKycService } from './merchant-kyc.service';

@Module({
  controllers: [MerchantKycController],
  providers: [MerchantKycService],
  exports: [MerchantKycService],
})
export class MerchantKycModule {}
