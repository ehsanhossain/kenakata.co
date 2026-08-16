import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { ApplyCouponDto, CreateCouponDto } from './dto/promotion.dto';
import { poishaToTaka, takaToPoisha } from '@/common/constants';

@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  async applyCoupon(dto: ApplyCouponDto) {
    const promo = await this.prisma.promotion.findFirst({
      where: {
        code: dto.code.toUpperCase(),
        isActive: true,
        startsAt: { lte: new Date() },
        OR: [{ endsAt: null }, { endsAt: { gt: new Date() } }],
      },
    });

    if (!promo) {
      throw new BadRequestException('Invalid, inactive, or expired coupon code');
    }

    const rules = (promo.rules as any) || {};
    const minOrderMinor = rules.minOrderMinor ? BigInt(rules.minOrderMinor) : BigInt(0);

    if (BigInt(dto.subtotalMinor) < minOrderMinor) {
      throw new BadRequestException(
        `This coupon requires a minimum subtotal of ${poishaToTaka(minOrderMinor)} Tk`,
      );
    }

    let discountMinor = BigInt(0);

    if (promo.discountKind === 'PERCENTAGE') {
      discountMinor = (BigInt(dto.subtotalMinor) * BigInt(promo.value)) / BigInt(100);
      if (rules.maxDiscountMinor) {
        const maxCap = BigInt(rules.maxDiscountMinor);
        if (discountMinor > maxCap) {
          discountMinor = maxCap;
        }
      }
    } else if (promo.discountKind === 'FIXED_AMOUNT') {
      discountMinor = BigInt(promo.value);
    } else if (promo.discountKind === 'FREE_SHIPPING') {
      discountMinor = BigInt(0); // Handled during shipping calculation
    }

    return {
      valid: true,
      couponCode: promo.code,
      name: promo.name,
      discountKind: promo.discountKind,
      discountValue: promo.value,
      discountMinor: Number(discountMinor),
      discountAmount: poishaToTaka(discountMinor),
    };
  }

  async createCoupon(dto: CreateCouponDto) {
    const existing = await this.prisma.promotion.findUnique({
      where: { code: dto.code.toUpperCase() },
    });

    if (existing) {
      throw new BadRequestException(`Coupon code "${dto.code}" already exists`);
    }

    return this.prisma.promotion.create({
      data: {
        code: dto.code.toUpperCase(),
        name: dto.name,
        type: 'COUPON',
        discountKind: dto.discountKind,
        value: dto.value,
        rules: {
          minOrderMinor: dto.minOrderMinor || 0,
          maxDiscountMinor: dto.maxDiscountMinor || null,
        },
        startsAt: new Date(),
        isActive: true,
      },
    });
  }

  async listCoupons() {
    return this.prisma.promotion.findMany({
      where: { type: 'COUPON' },
      orderBy: { createdAt: 'desc' },
    });
  }
}
