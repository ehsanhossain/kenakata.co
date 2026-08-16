import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { CheckoutQuoteDto, PlaceOrderDto } from './dto/checkout.dto';
import { OptionalJwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Checkout')
@Controller('checkout')
@UseGuards(OptionalJwtAuthGuard)
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('quote')
  @ApiOperation({ summary: 'Calculate accurate checkout quote, delivery charge, and applied discounts' })
  async calculateQuote(@Body() dto: CheckoutQuoteDto) {
    return this.checkoutService.calculateQuote(dto);
  }

  @Post('place-order')
  @ApiOperation({ summary: 'Place order atomically with address snapshot, stock reservation, and payment init' })
  async placeOrder(
    @Body() dto: PlaceOrderDto,
    @CurrentUser('id') customerId?: string,
    @Headers('idempotency-key') idempotencyKey?: string,
  ) {
    return this.checkoutService.placeOrder(dto, customerId, idempotencyKey);
  }
}
