import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MerchantAuthController } from './merchant-auth.controller';
import { MerchantAuthService } from './merchant-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'kenakata_jwt_secret_pr0d_2026_super_secure',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [MerchantAuthController],
  providers: [MerchantAuthService],
  exports: [MerchantAuthService],
})
export class MerchantAuthModule {}
