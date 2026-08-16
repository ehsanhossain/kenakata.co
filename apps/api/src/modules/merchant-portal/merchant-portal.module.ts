import { Module } from '@nestjs/common';
import { MerchantPortalController } from './merchant-portal.controller';
import { MerchantPortalService } from './merchant-portal.service';

@Module({
  controllers: [MerchantPortalController],
  providers: [MerchantPortalService],
  exports: [MerchantPortalService],
})
export class MerchantPortalModule {}
