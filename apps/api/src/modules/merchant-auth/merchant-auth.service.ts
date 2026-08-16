import { Injectable, BadRequestException, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma.service';
import { MerchantRegisterDto, MerchantLoginDto } from './dto/merchant-auth.dto';

@Injectable()
export class MerchantAuthService {
  private readonly logger = new Logger(MerchantAuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: MerchantRegisterDto) {
    const existing = await this.prisma.merchant.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    if (existing) {
      throw new ConflictException('A merchant with this email or phone number already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const slugBase = dto.shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = `${slugBase}-${Math.floor(1000 + Math.random() * 9000)}`;

    const merchant = await this.prisma.merchant.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        name: dto.name,
        passwordHash,
        status: 'PENDING_ONBOARDING',
        shop: {
          create: {
            name: dto.shopName,
            slug,
            contactEmail: dto.email,
            contactPhone: dto.phone,
            entityType: 'SOLE_PROPRIETORSHIP',
          },
        },
      },
      include: {
        shop: true,
      },
    });

    const tokens = this.generateTokens(merchant.id, merchant.email, 'MERCHANT');

    return {
      message: 'Merchant account registered successfully. Please proceed with KYC onboarding.',
      merchant: {
        id: merchant.id,
        name: merchant.name,
        email: merchant.email,
        phone: merchant.phone,
        status: merchant.status,
        shop: merchant.shop,
      },
      tokens,
    };
  }

  async login(dto: MerchantLoginDto) {
    const merchant = await this.prisma.merchant.findFirst({
      where: {
        OR: [{ email: dto.emailOrPhone }, { phone: dto.emailOrPhone }],
      },
      include: {
        shop: true,
        kycDocuments: true,
        bankAccounts: true,
      },
    });

    if (!merchant) {
      throw new UnauthorizedException('Invalid merchant email/phone or password.');
    }

    const isMatch = await bcrypt.compare(dto.password, merchant.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid merchant email/phone or password.');
    }

    if (merchant.status === 'SUSPENDED') {
      throw new UnauthorizedException('This merchant account has been suspended. Please contact Kenakata Compliance.');
    }

    const tokens = this.generateTokens(merchant.id, merchant.email, 'MERCHANT');

    return {
      message: 'Merchant authenticated successfully.',
      merchant: {
        id: merchant.id,
        name: merchant.name,
        email: merchant.email,
        phone: merchant.phone,
        status: merchant.status,
        rejectionReason: merchant.rejectionReason,
        shop: merchant.shop,
        kycDocumentsCount: merchant.kycDocuments.length,
        hasBankAccount: merchant.bankAccounts.length > 0,
      },
      tokens,
    };
  }

  async getProfile(merchantId: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
      include: {
        shop: true,
        kycDocuments: true,
        bankAccounts: true,
      },
    });

    if (!merchant) {
      throw new UnauthorizedException('Merchant not found.');
    }

    return {
      id: merchant.id,
      name: merchant.name,
      email: merchant.email,
      phone: merchant.phone,
      status: merchant.status,
      commissionRate: merchant.commissionRate,
      verifiedAt: merchant.verifiedAt,
      rejectionReason: merchant.rejectionReason,
      shop: merchant.shop,
      kycDocuments: merchant.kycDocuments,
      bankAccounts: merchant.bankAccounts,
    };
  }

  private generateTokens(id: string, email: string, role: string) {
    const payload = { sub: id, email, role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 604800,
    };
  }
}
