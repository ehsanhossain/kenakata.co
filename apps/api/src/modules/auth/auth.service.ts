import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '@/common/prisma.service';
import { RedisService } from '@/common/redis.service';
import { RequestOtpDto, VerifyOtpDto, AdminLoginDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  async requestCustomerOtp(dto: RequestOtpDto) {
    const { phone } = dto;
    // Generate deterministic mock OTP for local dev/testing or random 6 digit in production
    const isDev = process.env.NODE_ENV !== 'production';
    const otpCode = isDev ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await bcrypt.hash(otpCode, 8);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

    // Store in DB challenge table
    await this.prisma.otpChallenge.create({
      data: {
        phoneE164: phone,
        purpose: 'LOGIN_OR_REGISTER',
        codeHash,
        expiresAt,
        maxAttempts: 5,
      },
    });

    this.logger.log(`[SMS-MOCK] Generated OTP for ${phone}: ${otpCode}`);

    return {
      message: 'OTP sent successfully',
      phone,
      expiresInSeconds: 300,
      devOtp: isDev ? otpCode : undefined,
    };
  }

  async verifyCustomerOtp(dto: VerifyOtpDto, clientMeta?: { userAgent?: string; ip?: string }) {
    const { phone, code, guestCartToken } = dto;

    // Find the latest valid challenge for this phone
    const challenge = await this.prisma.otpChallenge.findFirst({
      where: {
        phoneE164: phone,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!challenge) {
      // For local development ease, allow standard default dev code 123456
      if (process.env.NODE_ENV === 'development' && code === '123456') {
        // proceed
      } else {
        throw new BadRequestException('Invalid or expired OTP. Please request a new code.');
      }
    } else {
      if (challenge.attemptCount >= challenge.maxAttempts) {
        throw new BadRequestException('Too many incorrect attempts. Please request a new OTP.');
      }

      const isValid = await bcrypt.compare(code, challenge.codeHash);
      if (!isValid && !(process.env.NODE_ENV === 'development' && code === '123456')) {
        await this.prisma.otpChallenge.update({
          where: { id: challenge.id },
          data: { attemptCount: { increment: 1 } },
        });
        throw new BadRequestException('Incorrect OTP code');
      }

      // Mark challenge as consumed
      await this.prisma.otpChallenge.update({
        where: { id: challenge.id },
        data: { consumedAt: new Date() },
      });
    }

    // Find or create customer
    let customer = await this.prisma.customer.findUnique({
      where: { phoneE164: phone },
    });

    if (!customer) {
      customer = await this.prisma.customer.create({
        data: {
          phoneE164: phone,
          phoneVerifiedAt: new Date(),
          locale: 'EN_BD',
          status: 'ACTIVE',
        },
      });
    } else if (!customer.phoneVerifiedAt) {
      customer = await this.prisma.customer.update({
        where: { id: customer.id },
        data: { phoneVerifiedAt: new Date() },
      });
    }

    // Generate tokens and create session
    const tokens = await this.generateTokens({
      sub: customer.id,
      type: 'CUSTOMER',
      phone: customer.phoneE164,
    });

    // Hash refresh token and save session
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 8);
    await this.prisma.customerSession.create({
      data: {
        customerId: customer.id,
        refreshTokenHash,
        userAgent: clientMeta?.userAgent,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Merge guest cart if token provided
    if (guestCartToken) {
      await this.mergeGuestCart(guestCartToken, customer.id);
    }

    return {
      customer: {
        id: customer.id,
        phone: customer.phoneE164,
        email: customer.email,
        name: customer.name,
        locale: customer.locale,
      },
      tokens,
    };
  }

  async adminLogin(dto: AdminLoginDto) {
    const { email, password } = dto;

    const admin = await this.prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    if (!admin || admin.status !== 'ACTIVE') {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Update last login
    await this.prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    const roleCodes = admin.roles.map((r) => r.role.code);

    const tokens = await this.generateTokens({
      sub: admin.id,
      type: 'ADMIN',
      email: admin.email,
      roles: roleCodes,
    });

    return {
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        roles: roleCodes,
      },
      tokens,
    };
  }

  async refreshCustomerToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: process.env.JWT_SECRET || 'kenakata_jwt_super_secret_key_change_in_production_2026',
      }) as JwtPayload;

      if (payload.type !== 'CUSTOMER') {
        throw new UnauthorizedException('Invalid token type for customer refresh');
      }

      const customer = await this.prisma.customer.findUnique({
        where: { id: payload.sub },
      });

      if (!customer || customer.status !== 'ACTIVE') {
        throw new UnauthorizedException('Customer not found or inactive');
      }

      const tokens = await this.generateTokens({
        sub: customer.id,
        type: 'CUSTOMER',
        phone: customer.phoneE164,
      });

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private async generateTokens(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 86400, // 24 hours in seconds
    };
  }

  private async mergeGuestCart(guestToken: string, customerId: string) {
    try {
      const guestCart = await this.prisma.cart.findFirst({
        where: { guestTokenHash: guestToken },
        include: { items: true },
      });

      if (!guestCart || guestCart.items.length === 0) return;

      // Find or create customer cart
      let customerCart = await this.prisma.cart.findFirst({
        where: { customerId },
        include: { items: true },
      });

      if (!customerCart) {
        // Link the guest cart to customer
        await this.prisma.cart.update({
          where: { id: guestCart.id },
          data: { customerId, guestTokenHash: null },
        });
        return;
      }

      // Merge items
      for (const item of guestCart.items) {
        const existing = customerCart.items.find((i) => i.variantId === item.variantId);
        if (existing) {
          await this.prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + item.quantity },
          });
        } else {
          await this.prisma.cartItem.create({
            data: {
              cartId: customerCart.id,
              variantId: item.variantId,
              quantity: item.quantity,
            },
          });
        }
      }

      // Delete old guest cart
      await this.prisma.cart.delete({ where: { id: guestCart.id } });
    } catch (err: any) {
      this.logger.warn(`Failed to merge guest cart: ${err.message}`);
    }
  }
}
