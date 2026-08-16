import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { PromotionService } from '@/modules/promotion/promotion.service';
import { CheckoutQuoteDto, PlaceOrderDto } from './dto/checkout.dto';
import { poishaToTaka, SHIPPING_RATES } from '@/common/constants';
import * as crypto from 'crypto';

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly promotionService: PromotionService,
  ) {}

  async calculateQuote(dto: CheckoutQuoteDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Checkout quote requires at least one item');
    }

    let subtotalMinor = BigInt(0);
    const resolvedItems = [];

    for (const item of dto.items) {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: {
          product: { include: { translations: true, media: { orderBy: { sortOrder: 'asc' } } } },
          prices: { where: { currency: 'BDT' }, orderBy: { priority: 'desc' } },
        },
      });

      if (!variant || !variant.isActive) {
        throw new NotFoundException(`Product item is no longer available`);
      }

      const priceRecord = variant.prices[0];
      const unitPriceMinor = priceRecord ? priceRecord.amountMinor : BigInt(0);
      const lineTotalMinor = unitPriceMinor * BigInt(item.quantity);

      subtotalMinor += lineTotalMinor;

      const title = variant.product?.translations?.find((t) => t.locale === 'EN_BD')?.title || variant.product.slug;
      const image = variant.product?.media?.[0]?.objectKey || '';

      resolvedItems.push({
        variantId: variant.id,
        productId: variant.productId,
        sku: variant.sku,
        title,
        variantTitle: variant.title,
        unitPrice: poishaToTaka(unitPriceMinor),
        unitPriceMinor: Number(unitPriceMinor),
        quantity: item.quantity,
        total: poishaToTaka(lineTotalMinor),
        totalMinor: Number(lineTotalMinor),
        image,
      });
    }

    // Shipping calculation based on Bangladesh division
    const isInsideDhaka = dto.division.toLowerCase() === 'dhaka';
    const isFreeShipping = subtotalMinor >= BigInt(SHIPPING_RATES.FREE_SHIPPING_THRESHOLD_MINOR);

    let shippingMinor = BigInt(0);
    if (!isFreeShipping) {
      shippingMinor = isInsideDhaka
        ? BigInt(SHIPPING_RATES.INSIDE_DHAKA_MINOR)
        : BigInt(SHIPPING_RATES.OUTSIDE_DHAKA_MINOR);
    }

    // Coupon discount calculation
    let discountMinor = BigInt(0);
    let appliedCoupon = null;

    if (dto.couponCode) {
      try {
        const couponResult = await this.promotionService.applyCoupon({
          code: dto.couponCode,
          subtotalMinor: Number(subtotalMinor),
        });
        discountMinor = BigInt(couponResult.discountMinor);
        appliedCoupon = couponResult;
      } catch (err: any) {
        this.logger.warn(`Coupon application ignored during quote: ${err.message}`);
      }
    }

    const totalMinor = subtotalMinor + shippingMinor - discountMinor;

    return {
      items: resolvedItems,
      subtotal: poishaToTaka(subtotalMinor),
      subtotalMinor: Number(subtotalMinor),
      shipping: poishaToTaka(shippingMinor),
      shippingMinor: Number(shippingMinor),
      discount: poishaToTaka(discountMinor),
      discountMinor: Number(discountMinor),
      total: poishaToTaka(totalMinor > BigInt(0) ? totalMinor : BigInt(0)),
      totalMinor: Number(totalMinor > BigInt(0) ? totalMinor : BigInt(0)),
      isInsideDhaka,
      isFreeShipping,
      appliedCoupon,
      currency: 'BDT',
      deliveryEstimateDays: isInsideDhaka ? '2-3 Business Days' : '4-6 Business Days',
    };
  }

  async placeOrder(dto: PlaceOrderDto, customerId?: string, idempotencyKey?: string) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Order requires at least one item');
    }

    // Calculate authoritative totals
    const quote = await this.calculateQuote({
      division: dto.division,
      items: dto.items,
      couponCode: dto.couponCode,
    });

    // Generate unique order number (e.g. KK-2026-89412)
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `KK-2026-${randomSuffix}`;

    // Address snapshot
    const addressSnapshot = {
      recipientName: dto.recipientName,
      phone: dto.phone,
      email: dto.email,
      division: dto.division,
      district: dto.district,
      upazilaThana: dto.upazilaThana,
      addressLine: dto.addressLine,
      landmark: dto.landmark,
      instructions: dto.instructions,
    };

    // Ensure customer account exists if guest with phone
    let finalCustomerId = customerId;
    if (!finalCustomerId) {
      const existingCustomer = await this.prisma.customer.findUnique({
        where: { phoneE164: dto.phone },
      });
      if (existingCustomer) {
        finalCustomerId = existingCustomer.id;
      } else {
        const newCustomer = await this.prisma.customer.create({
          data: {
            phoneE164: dto.phone,
            name: dto.recipientName,
            email: dto.email,
            status: 'ACTIVE',
          },
        });
        finalCustomerId = newCustomer.id;
      }
    }

    // Atomic transaction for order creation
    const order = await this.prisma.$transaction(async (tx) => {
      const isCod = dto.paymentMethod === 'CASH_ON_DELIVERY';
      const initialStatus = isCod ? 'CONFIRMED' : 'PENDING_PAYMENT';
      const initialPaymentStatus = isCod ? 'PENDING' : 'CREATED';

      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerId: finalCustomerId,
          phoneE164: dto.phone,
          locale: 'EN_BD',
          currency: 'BDT',
          status: initialStatus,
          paymentStatus: initialPaymentStatus,
          fulfilmentStatus: 'UNALLOCATED',
          subtotalMinor: BigInt(quote.subtotalMinor),
          shippingMinor: BigInt(quote.shippingMinor),
          discountMinor: BigInt(quote.discountMinor),
          totalMinor: BigInt(quote.totalMinor),
          addressSnapshot,
          deliveryPromise: {
            estimateDays: quote.deliveryEstimateDays,
            insideDhaka: quote.isInsideDhaka,
          },
          placedAt: new Date(),
          items: {
            create: quote.items.map((item) => ({
              variantId: item.variantId,
              sku: item.sku,
              quantity: item.quantity,
              unitPriceMinor: BigInt(item.unitPriceMinor),
              totalMinor: BigInt(item.totalMinor),
              productSnapshot: {
                title: item.title,
                variantTitle: item.variantTitle,
                image: item.image,
              },
              returnPolicySnapshot: { policy: 'STANDARD_7_DAY' },
            })),
          },
          transitions: {
            create: {
              fromStatus: null,
              toStatus: initialStatus,
              source: 'CUSTOMER_CHECKOUT',
              note: `Order placed via ${dto.paymentMethod}`,
            },
          },
        },
      });

      // Create PaymentAttempt record
      const paymentAttemptKey = idempotencyKey || `pay_${crypto.randomBytes(12).toString('hex')}`;
      await tx.paymentAttempt.create({
        data: {
          orderId: newOrder.id,
          provider: dto.paymentMethod,
          method: dto.paymentMethod as any,
          status: isCod ? 'PENDING' : 'CREATED',
          amountMinor: BigInt(quote.totalMinor),
          idempotencyKey: paymentAttemptKey,
        },
      });

      return newOrder;
    });

    // Clear cart if guest or customer cart present
    if (finalCustomerId) {
      await this.prisma.cartItem.deleteMany({
        where: { cart: { customerId: finalCustomerId } },
      });
    }
    if (dto.guestCartToken) {
      await this.prisma.cartItem.deleteMany({
        where: { cart: { guestTokenHash: dto.guestCartToken } },
      });
    }

    // Determine mock payment redirect URL for digital gateways
    let paymentRedirectUrl = null;
    if (dto.paymentMethod === 'BKASH') {
      paymentRedirectUrl = `/orders/success?orderNumber=${orderNumber}&paymentMethod=BKASH&status=success`;
    } else if (dto.paymentMethod === 'SSLCOMMERZ') {
      paymentRedirectUrl = `/orders/success?orderNumber=${orderNumber}&paymentMethod=SSLCOMMERZ&status=success`;
    }

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: dto.paymentMethod,
      total: poishaToTaka(order.totalMinor),
      currency: 'BDT',
      placedAt: order.placedAt,
      paymentRedirectUrl,
      trackingUrl: `/track?orderNumber=${order.orderNumber}&phone=${encodeURIComponent(dto.phone)}`,
    };
  }
}
