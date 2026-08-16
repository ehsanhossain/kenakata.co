import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { CreatePaymentIntentDto, VerifyPaymentDto } from './dto/payment.dto';
import { poishaToTaka } from '@/common/constants';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createIntent(dto: CreatePaymentIntentDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const idempotencyKey = `pay_${crypto.randomBytes(12).toString('hex')}`;

    const payment = await this.prisma.paymentAttempt.create({
      data: {
        orderId: order.id,
        provider: dto.method,
        method: dto.method as any,
        status: 'SESSION_CREATED',
        amountMinor: order.totalMinor,
        idempotencyKey,
      },
    });

    const isDev = process.env.NODE_ENV !== 'production';

    // Mock gateways integration
    let redirectUrl = `/orders/success?orderNumber=${order.orderNumber}&paymentMethod=${dto.method}&status=success`;
    if (dto.method === 'BKASH') {
      redirectUrl = `/orders/success?orderNumber=${order.orderNumber}&paymentMethod=BKASH&status=success`;
    } else if (dto.method === 'SSLCOMMERZ') {
      redirectUrl = `/orders/success?orderNumber=${order.orderNumber}&paymentMethod=SSLCOMMERZ&status=success`;
    }

    return {
      paymentId: payment.id,
      idempotencyKey,
      orderNumber: order.orderNumber,
      amount: poishaToTaka(order.totalMinor),
      currency: 'BDT',
      method: dto.method,
      redirectUrl,
    };
  }

  async verifyPayment(dto: VerifyPaymentDto) {
    const payment = await this.prisma.paymentAttempt.findFirst({
      where: {
        OR: [{ id: dto.paymentId }, { idempotencyKey: dto.paymentId }],
      },
      include: { order: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment attempt not found');
    }

    const trxId = dto.trxID || `TRX_${crypto.randomBytes(6).toString('hex').toUpperCase()}`;

    await this.prisma.$transaction(async (tx) => {
      await tx.paymentAttempt.update({
        where: { id: payment.id },
        data: {
          status: 'CAPTURED',
          providerReference: trxId,
          verifiedAt: new Date(),
        },
      });

      await tx.order.update({
        where: { id: payment.orderId },
        data: {
          status: 'CONFIRMED',
          paymentStatus: 'CAPTURED',
        },
      });

      await tx.orderTransition.create({
        data: {
          orderId: payment.orderId,
          fromStatus: payment.order.status,
          toStatus: 'CONFIRMED',
          source: 'PAYMENT_GATEWAY_WEBHOOK',
          note: `Payment verified via ${payment.provider} (TrxID: ${trxId})`,
        },
      });
    });

    return {
      success: true,
      orderNumber: payment.order.orderNumber,
      trxId,
      status: 'CAPTURED',
    };
  }
}
