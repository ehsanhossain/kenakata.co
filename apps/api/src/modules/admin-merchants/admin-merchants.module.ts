import { Module } from '@nestjs/common';
import { AdminMerchantsController } from './admin-merchants.controller';
import { AdminMerchantsService } from './admin-merchants.service';

@Module({
  controllers: [AdminMerchantsController],
  providers: [AdminMerchantsService],
  exports: [AdminMerchantsService],
})
export class AdminMerchantsModule {}
