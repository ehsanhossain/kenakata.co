import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { Step1EntityDetailsDto, UploadKycDocDto, Step3BankDetailsDto } from './dto/merchant-kyc.dto';

@Injectable()
export class MerchantKycService {
  constructor(private readonly prisma: PrismaService) {}

  async saveEntityDetails(merchantId: string, dto: Step1EntityDetailsDto) {
    const shop = await this.prisma.shop.findUnique({
      where: { merchantId },
    });

    if (!shop) {
      throw new NotFoundException('Shop profile not found for this merchant.');
    }

    const updated = await this.prisma.shop.update({
      where: { id: shop.id },
      data: {
        entityType: dto.entityType,
        tradeLicenseNo: dto.tradeLicenseNo,
        tradeLicenseExpiry: dto.tradeLicenseExpiry ? new Date(dto.tradeLicenseExpiry) : undefined,
        tinNo: dto.tinNo,
        binNo: dto.binNo,
        nidNo: dto.nidNo,
        division: dto.division,
        district: dto.district,
        upazila: dto.upazila,
        fullAddress: dto.fullAddress,
      },
    });

    return {
      message: 'Business entity details saved successfully.',
      shop: updated,
    };
  }

  async uploadKycDocument(merchantId: string, dto: UploadKycDocDto) {
    const shop = await this.prisma.shop.findUnique({
      where: { merchantId },
    });

    // Delete previous doc of same type if re-uploading
    await this.prisma.merchantKycDocument.deleteMany({
      where: {
        merchantId,
        documentType: dto.documentType,
      },
    });

    const doc = await this.prisma.merchantKycDocument.create({
      data: {
        merchantId,
        shopId: shop?.id,
        documentType: dto.documentType,
        documentNumber: dto.documentNumber,
        fileUrl: dto.fileUrl,
        fileName: dto.fileName,
        fileSize: dto.fileSize,
        mimeType: dto.mimeType,
        status: 'PENDING',
      },
    });

    return {
      message: 'Document uploaded successfully.',
      document: doc,
    };
  }

  async saveBankDetails(merchantId: string, dto: Step3BankDetailsDto) {
    const shop = await this.prisma.shop.findUnique({
      where: { merchantId },
    });

    // Upsert primary bank account
    const existing = await this.prisma.merchantBankAccount.findFirst({
      where: { merchantId, isDefault: true },
    });

    let bankAccount;
    if (existing) {
      bankAccount = await this.prisma.merchantBankAccount.update({
        where: { id: existing.id },
        data: {
          accountType: dto.accountType,
          bankName: dto.bankName,
          branchName: dto.branchName,
          routingNumber: dto.routingNumber,
          accountHolderName: dto.accountHolderName,
          accountNumber: dto.accountNumber,
          mfsNumber: dto.mfsNumber,
        },
      });
    } else {
      bankAccount = await this.prisma.merchantBankAccount.create({
        data: {
          merchantId,
          shopId: shop?.id,
          accountType: dto.accountType,
          bankName: dto.bankName,
          branchName: dto.branchName,
          routingNumber: dto.routingNumber,
          accountHolderName: dto.accountHolderName,
          accountNumber: dto.accountNumber,
          mfsNumber: dto.mfsNumber,
          isDefault: true,
        },
      });
    }

    return {
      message: 'Settlement bank details saved successfully.',
      bankAccount,
    };
  }

  async submitForReview(merchantId: string) {
    const docs = await this.prisma.merchantKycDocument.findMany({
      where: { merchantId },
    });

    if (docs.length < 2) {
      throw new BadRequestException('Please upload at least Trade License and NID before submitting for compliance review.');
    }

    const merchant = await this.prisma.merchant.update({
      where: { id: merchantId },
      data: {
        status: 'UNDER_REVIEW',
        rejectionReason: null,
      },
      include: {
        shop: true,
        kycDocuments: true,
        bankAccounts: true,
      },
    });

    return {
      message: 'KYC application submitted successfully. Your store is now under review by Kenakata Compliance Team.',
      merchant: {
        id: merchant.id,
        name: merchant.name,
        status: merchant.status,
        shop: merchant.shop,
      },
    };
  }

  async getOnboardingStatus(merchantId: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
      include: {
        shop: true,
        kycDocuments: true,
        bankAccounts: true,
      },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found.');
    }

    const hasEntity = Boolean(merchant.shop?.tradeLicenseNo || merchant.shop?.nidNo);
    const hasDocs = merchant.kycDocuments.length >= 2;
    const hasBank = merchant.bankAccounts.length > 0;

    let currentStep = 1;
    if (hasEntity) currentStep = 2;
    if (hasEntity && hasDocs) currentStep = 3;
    if (hasEntity && hasDocs && hasBank) currentStep = 4;
    if (merchant.status === 'UNDER_REVIEW' || merchant.status === 'APPROVED' || merchant.status === 'REJECTED') {
      currentStep = 5;
    }

    return {
      status: merchant.status,
      currentStep,
      rejectionReason: merchant.rejectionReason,
      shop: merchant.shop,
      documents: merchant.kycDocuments,
      bankAccounts: merchant.bankAccounts,
      completion: {
        step1Entity: hasEntity,
        step2Documents: hasDocs,
        step3Bank: hasBank,
        step4ReviewSubmitted: merchant.status !== 'PENDING_ONBOARDING',
      },
    };
  }
}
