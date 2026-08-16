import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { AdminMerchantFilterDto, ApproveMerchantDto, RejectMerchantDto, RejectKycDocDto, RejectProductDto } from './dto/admin-merchants.dto';

@Injectable()
export class AdminMerchantsService {
  private readonly logger = new Logger(AdminMerchantsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async listMerchants(filter: AdminMerchantFilterDto) {
    const page = Number(filter.page) || 1;
    const limit = Number(filter.limit) || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filter.status) {
      where.status = filter.status;
    }
    if (filter.q) {
      where.OR = [
        { name: { contains: filter.q, mode: 'insensitive' } },
        { email: { contains: filter.q, mode: 'insensitive' } },
        { phone: { contains: filter.q } },
        { shop: { name: { contains: filter.q, mode: 'insensitive' } } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.merchant.count({ where }),
      this.prisma.merchant.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          shop: {
            include: {
              _count: {
                select: { products: true },
              },
            },
          },
          kycDocuments: {
            select: { id: true, documentType: true, status: true, fileUrl: true },
          },
          bankAccounts: true,
        },
      }),
    ]);

    // Counts by status for tabs
    const [underReviewCount, approvedCount, rejectedCount, totalCount] = await Promise.all([
      this.prisma.merchant.count({ where: { status: 'UNDER_REVIEW' } }),
      this.prisma.merchant.count({ where: { status: 'APPROVED' } }),
      this.prisma.merchant.count({ where: { status: 'REJECTED' } }),
      this.prisma.merchant.count(),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      counts: {
        underReview: underReviewCount,
        approved: approvedCount,
        rejected: rejectedCount,
        all: totalCount,
      },
    };
  }

  async getMerchantDetails(id: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id },
      include: {
        shop: {
          include: {
            products: {
              include: {
                variants: true,
                translations: true,
              },
            },
          },
        },
        kycDocuments: {
          orderBy: { submittedAt: 'desc' },
        },
        bankAccounts: true,
        payouts: {
          orderBy: { requestedAt: 'desc' },
        },
      },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant application not found.');
    }

    return merchant;
  }

  async approveMerchant(id: string, dto: ApproveMerchantDto, adminUser: any) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id },
      include: { shop: true },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found.');
    }

    // Mark all pending docs as verified
    await this.prisma.merchantKycDocument.updateMany({
      where: { merchantId: id, status: 'PENDING' },
      data: {
        status: 'VERIFIED',
        verifiedAt: new Date(),
        verifiedBy: adminUser?.email || 'Compliance Officer',
      },
    });

    const updated = await this.prisma.merchant.update({
      where: { id },
      data: {
        status: 'APPROVED',
        verifiedAt: new Date(),
        verifiedBy: adminUser?.email || 'Compliance Officer',
        rejectionReason: null,
        commissionRate: dto.commissionRate || merchant.commissionRate || 5.0,
      },
      include: { shop: true },
    });

    if (merchant.shop) {
      await this.prisma.shop.update({
        where: { id: merchant.shop.id },
        data: { isVerified: true },
      });
    }

    this.logger.log(`[KYC-AUDIT] Merchant ${merchant.name} (${id}) APPROVED by ${adminUser?.email || 'Admin'}`);

    return {
      message: `Merchant "${merchant.name}" has been approved and their store is now live!`,
      merchant: updated,
    };
  }

  async rejectMerchant(id: string, dto: RejectMerchantDto, adminUser: any) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id },
      include: { shop: true },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found.');
    }

    const updated = await this.prisma.merchant.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectionReason: dto.rejectionReason,
      },
      include: { shop: true },
    });

    if (merchant.shop) {
      await this.prisma.shop.update({
        where: { id: merchant.shop.id },
        data: { isVerified: false },
      });
    }

    this.logger.log(`[KYC-AUDIT] Merchant ${merchant.name} (${id}) REJECTED by ${adminUser?.email || 'Admin'}. Reason: ${dto.rejectionReason}`);

    return {
      message: `Merchant "${merchant.name}" has been marked for resubmission. Feedback sent.`,
      merchant: updated,
    };
  }

  async verifyKycDoc(docId: string, adminUser: any) {
    const doc = await this.prisma.merchantKycDocument.update({
      where: { id: docId },
      data: {
        status: 'VERIFIED',
        verifiedAt: new Date(),
        verifiedBy: adminUser?.email || 'Compliance Officer',
        rejectionReason: null,
      },
    });

    return { message: 'Document marked as verified.', document: doc };
  }

  async rejectKycDoc(docId: string, dto: RejectKycDocDto, adminUser: any) {
    const doc = await this.prisma.merchantKycDocument.update({
      where: { id: docId },
      data: {
        status: 'REJECTED',
        rejectionReason: dto.rejectionReason,
        verifiedBy: adminUser?.email || 'Compliance Officer',
      },
    });

    return { message: 'Document marked as rejected.', document: doc };
  }

  // Product Approvals Queue
  async listPendingProducts(params?: { page?: number; limit?: number }) {
    const page = Number(params?.page) || 1;
    const limit = Number(params?.limit) || 20;
    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      this.prisma.product.count({
        where: { approvalStatus: 'PENDING_APPROVAL' },
      }),
      this.prisma.product.findMany({
        where: { approvalStatus: 'PENDING_APPROVAL' },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          shop: true,
          category: { include: { translations: true } },
          brand: { include: { translations: true } },
          translations: true,
          variants: { include: { prices: true, inventory: true } },
          media: { orderBy: { sortOrder: 'asc' } },
        },
      }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async approveProduct(id: string, adminUser: any) {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        approvalStatus: 'APPROVED',
        status: 'ACTIVE',
        approvedAt: new Date(),
        approvedBy: adminUser?.email || 'Admin Catalog Lead',
        rejectionReason: null,
      },
    });

    return { message: 'Product approved and activated in storefront catalog.', product };
  }

  async rejectProduct(id: string, dto: RejectProductDto, adminUser: any) {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        approvalStatus: 'REJECTED',
        status: 'DRAFT',
        rejectionReason: dto.rejectionReason,
      },
    });

    return { message: 'Product rejected with feedback provided to merchant.', product };
  }
}
