import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentIntentDto, VerifyPaymentDto } from './dto/payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('intent')
  @ApiOperation({ summary: 'Create payment session/intent for bKash, SSLCommerz, or COD' })
  async createIntent(@Body() dto: CreatePaymentIntentDto) {
    return this.paymentService.createIntent(dto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify gateway payment callback and mark order confirmed' })
  async verifyPayment(@Body() dto: VerifyPaymentDto) {
    return this.paymentService.verifyPayment(dto);
  }
}
