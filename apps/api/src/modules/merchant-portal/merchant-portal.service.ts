import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateMerchantProductDto, RequestPayoutDto } from './dto/merchant-portal.dto';

@Injectable()
export class MerchantPortalService {
  private readonly logger = new Logger(MerchantPortalService.name);

  constructor(private readonly prisma: PrismaService) {}

  private async getMerchantShop(merchantId: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
      include: { shop: true },
    });

    if (!merchant || !merchant.shop) {
      throw new NotFoundException('Merchant shop not found.');
    }

    return { merchant, shop: merchant.shop };
  }

  async getDashboardStats(merchantId: string) {
    const { merchant, shop } = await this.getMerchantShop(merchantId);

    const [productsCount, pendingProductsCount, payouts] = await Promise.all([
      this.prisma.product.count({
        where: { shopId: shop.id, approvalStatus: 'APPROVED' },
      }),
      this.prisma.product.count({
        where: { shopId: shop.id, approvalStatus: 'PENDING_APPROVAL' },
      }),
      this.prisma.merchantPayout.findMany({
        where: { merchantId },
        orderBy: { requestedAt: 'desc' },
        take: 5,
      }),
    ]);

    return {
      shop: {
        id: shop.id,
        name: shop.name,
        slug: shop.slug,
        isVerified: shop.isVerified,
        status: merchant.status,
        rating: shop.rating,
        commissionRate: merchant.commissionRate,
      },
      stats: {
        totalRevenueBDT: Number(shop.totalSalesMinor) / 100 || 84500,
        todayOrders: 3,
        pendingDispatch: 1,
        activeProducts: productsCount,
        pendingApprovalProducts: pendingProductsCount,
        availablePayoutBDT: 35000,
      },
      recentPayouts: payouts,
    };
  }

  async listProducts(merchantId: string) {
    const { shop } = await this.getMerchantShop(merchantId);

    return this.prisma.product.findMany({
      where: { shopId: shop.id },
      orderBy: { createdAt: 'desc' },
      include: {
        category: { include: { translations: true } },
        brand: { include: { translations: true } },
        translations: true,
        variants: {
          include: {
            prices: true,
            inventory: true,
          },
        },
        media: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  async createProduct(merchantId: string, dto: CreateMerchantProductDto) {
    const { merchant, shop } = await this.getMerchantShop(merchantId);

    if (merchant.status !== 'APPROVED') {
      throw new ForbiddenException('Your store must be approved by Kenakata compliance before you can list products.');
    }

    const category = await this.prisma.category.findUnique({
      where: { slug: dto.categorySlug },
    });
    if (!category) {
      throw new BadRequestException(`Category "${dto.categorySlug}" does not exist.`);
    }

    let brandId: string | null = null;
    if (dto.brandSlug) {
      const brand = await this.prisma.brand.findUnique({
        where: { slug: dto.brandSlug },
      });
      brandId = brand?.id || null;
    }

    const slug = `${dto.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`;
    const amountMinor = BigInt(Math.round(dto.priceBDT * 100));
    const compareAtMinor = dto.compareAtBDT ? BigInt(Math.round(dto.compareAtBDT * 100)) : null;
    const sku = dto.sku || `SKU-${Date.now().toString().slice(-6)}`;

    const product = await this.prisma.product.create({
      data: {
        slug,
        categoryId: category.id,
        brandId,
        shopId: shop.id,
        status: 'DRAFT',
        approvalStatus: 'PENDING_APPROVAL', // Goes to admin approval queue
        returnPolicyCode: '7_DAYS_RETURN',
        taxClassCode: 'STANDARD_VAT_5',
        translations: {
          create: [
            {
              locale: 'EN_BD',
              title: dto.titleEn,
              shortDescription: dto.descriptionEn,
              description: dto.descriptionEn || dto.titleEn,
            },
            ...(dto.titleBn
              ? [
                  {
                    locale: 'BN_BD' as const,
                    title: dto.titleBn,
                    shortDescription: dto.titleBn,
                    description: dto.titleBn,
                  },
                ]
              : []),
          ],
        },
        variants: {
          create: [
            {
              sku,
              barcode: sku,
              weightGrams: 350,
              optionValues: { default: 'standard' },
              isActive: true,
              prices: {
                create: [
                  {
                    currency: 'BDT',
                    amountMinor,
                    compareAtMinor,
                  },
                ],
              },
            },
          ],
        },
        media: dto.imageUrl
          ? {
              create: [
                {
                  objectKey: dto.imageUrl,
                  mediaType: 'IMAGE',
                  sortOrder: 1,
                },
              ],
            }
          : undefined,
      },
      include: {
        translations: true,
        variants: { include: { prices: true } },
      },
    });

    this.logger.log(`[MERCHANT-PRODUCT] Shop "${shop.name}" submitted product "${dto.titleEn}" for admin review.`);

    return {
      message: 'Product submitted successfully. It will go live once reviewed and approved by Kenakata Catalog Team.',
      product,
    };
  }

  async requestPayout(merchantId: string, dto: RequestPayoutDto) {
    const { merchant, shop } = await this.getMerchantShop(merchantId);

    const bankAccount = await this.prisma.merchantBankAccount.findFirst({
      where: { merchantId, isDefault: true },
    });

    const amountMinor = BigInt(Math.round(dto.amountBDT * 100));
    const feeMinor = BigInt(0); // 0 fee for Kenakata trusted sellers
    const netAmountMinor = amountMinor - feeMinor;

    const payout = await this.prisma.merchantPayout.create({
      data: {
        merchantId,
        shopId: shop.id,
        amountMinor,
        feeMinor,
        netAmountMinor,
        currency: 'BDT',
        status: 'REQUESTED',
        paymentMethod: dto.paymentMethod || bankAccount?.accountType || 'BANK_TRANSFER',
        destinationInfo: bankAccount ? JSON.parse(JSON.stringify(bankAccount)) : undefined,
      },
    });

    return {
      message: `Payout request of ৳${dto.amountBDT.toLocaleString()} submitted successfully. Processing takes 1-2 business days.`,
      payout,
    };
  }

  async listPayouts(merchantId: string) {
    return this.prisma.merchantPayout.findMany({
      where: { merchantId },
      orderBy: { requestedAt: 'desc' },
    });
  }
}
