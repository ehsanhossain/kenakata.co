import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PromotionModule } from './modules/promotion/promotion.module';
import { CartModule } from './modules/cart/cart.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReviewModule } from './modules/review/review.module';
import { SearchModule } from './modules/search/search.module';
import { ContentModule } from './modules/content/content.module';
import { MerchantAuthModule } from './modules/merchant-auth/merchant-auth.module';
import { MerchantKycModule } from './modules/merchant-kyc/merchant-kyc.module';
import { MerchantPortalModule } from './modules/merchant-portal/merchant-portal.module';
import { AdminMerchantsModule } from './modules/admin-merchants/admin-merchants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    CommonModule,
    HealthModule,
    AuthModule,
    CustomerModule,
    CatalogModule,
    InventoryModule,
    PromotionModule,
    CartModule,
    CheckoutModule,
    OrderModule,
    PaymentModule,
    ReviewModule,
    SearchModule,
    ContentModule,
    MerchantAuthModule,
    MerchantKycModule,
    MerchantPortalModule,
    AdminMerchantsModule,
  ],
})
export class AppModule {}
